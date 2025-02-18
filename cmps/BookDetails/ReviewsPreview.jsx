import { utilService } from "../../services/util-service.js"

export function ReviewsPreviews({ reviews, onRemoveReview }) {
    return (
        <table className="review-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Rating</th>
                    <th>Read at</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {reviews.map((review, reviewIdx) => (
                    <tr key={reviewIdx}>
                        <td>{review.name}</td>
                        <td>{utilService.convertRatingToStars(review.rating)}</td>
                        <td>{new Date(review.readAt).toLocaleDateString('en-IL')}</td>
                        <td><span className="fa-solid remove-btn" onClick={() => onRemoveReview(reviewIdx)}></span></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}