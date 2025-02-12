const { useState, useEffect } = React

import { bookService } from "../../services/books.service.js"
import { utilService } from "../../services/util-service.js"

export function AddReview({ bookId }) {

    const [reviews, setReviews] = useState([])
    const [newReview, setNewReview] = useState({
        name: '',
        stars: 0,
        readAt: ''
    })

    useEffect(() => {
        bookService.getById(bookId).then(book => {
            setReviews(book.reviews || [])
        })
    }, [bookId])

    function handleAddReview() {
        if (!newReview.name || newReview.stars === 0 || !newReview.readAt) return

        bookService.addReview(bookId, newReview)
            .then(() => {
                bookService.getById(bookId)
                    .then(book => {
                        setReviews(book.reviews || [])
                        setNewReview({ name: '', stars: 0, readAt: '' })
                    })
            })
            .catch(error => console.error("Error adding review:", error))
    }

    if (!reviews) return null

    return (
        <div>
            <div>
                <input
                    type="text"
                    placeholder="Your name"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                />

                <input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Stars"
                    value={newReview.stars}
                    onChange={(e) => setNewReview({ ...newReview, stars: +e.target.value })}
                />

                <input
                    type="date"
                    value={newReview.readAt}
                    onChange={(e) => setNewReview({ ...newReview, readAt: e.target.value })}
                />

                <button className="btn add-review-btn" onClick={handleAddReview}>
                    Submit Review
                </button>
            </div>

            {reviews && reviews.length > 0 && (
                <React.Fragment>
                    <h3>Reviews:</h3>
                    <table className="review-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Stars</th>
                                <th>Read at</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review, index) => (
                                <tr key={index} className="flex justify-between">
                                    <td>{review.name}</td>
                                    <td>{utilService.convertRatingToStars(review.stars)}</td>
                                    <td>{new Date(review.readAt).toLocaleDateString('en-IL')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </React.Fragment>
            )}


        </div>
    )
}
