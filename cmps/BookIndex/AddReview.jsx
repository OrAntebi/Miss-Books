const { useState, useEffect } = React
import { bookService } from "../../services/books.service.js"
import { ReviewsPreviews } from "./ReviewsPreview.jsx"

export function AddReview({ bookId, newReview }) {
    const [reviews, setReviews] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        bookService.getById(bookId)
            .then(book => {
                setIsLoading(true)
                setReviews(book.reviews || [])
            })
            .finally(() => setIsLoading(false))
    }, [bookId])


    useEffect(() => {
        setIsLoading(true)
        if (newReview) {
            setReviews((prevReviews) => [...prevReviews, newReview])
            setTimeout(() => setIsLoading(false), 500)
        }
    }, [newReview])


    function onRemoveReview(index) {
        setIsLoading(true)
        const updatedReviews = reviews.filter((_, i) => i !== index)
        bookService.getById(bookId)
            .then(book => {
                book.reviews = updatedReviews
                return bookService.save(book)
            })
            .then(() => {
                setReviews(updatedReviews)
            })
            .finally(() => setIsLoading(false))
    }

    if (isLoading) return (<h3>Loading reviews...</h3>)
    if (!reviews || reviews.length === 0) return (<h3>There are no book reviews</h3>)
    return (
        <section className="reviews">
            <fieldset>
                <legend>Reviews</legend>
                <ReviewsPreviews reviews={reviews} onRemoveReview={onRemoveReview} />
            </fieldset>
        </section>
    )
}
