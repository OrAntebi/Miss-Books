const { useState, useEffect } = React
import { bookService } from "../../services/books.service.js"
import { utilService } from "../../services/util-service.js"

export function AddReview({ bookId, newReview }) {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        bookService.getById(bookId)
            .then(book => {
                setReviews(book.reviews || [])
            })
    }, [bookId])

    useEffect(() => {
        if (newReview) {
            setReviews((prevReviews) => [...prevReviews, newReview])
        }
    }, [newReview])

    function onRemoveReview(index) {
        const updatedReviews = reviews.filter((_, i) => i !== index)
        bookService.getById(bookId)
            .then(book => {
                book.reviews = updatedReviews
                return bookService.save(book)
            })
            .then(() => {
                setReviews(updatedReviews)
            })
    }

    if (!reviews || reviews.length === 0) return

    return (
        <section className="reviews">
            <fieldset>
                <legend>Reviews</legend>
                <table className="review-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Read at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review, reviewIdx) => (
                            <tr key={reviewIdx}>
                                <td>{review.name}</td>
                                <td>{utilService.convertRatingToStars(review.rating)}</td>
                                <td>{new Date(review.readAt).toLocaleDateString('en-IL')}</td>
                                <td className="btn1" onClick={() => onRemoveReview(reviewIdx)}>Remove</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </fieldset>
        </section>
    )
}
