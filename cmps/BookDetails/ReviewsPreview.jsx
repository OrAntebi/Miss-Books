import { utilService } from "../../services/util-service.js"

export function ReviewsPreviews({ reviews, onRemoveReview }) {
    return (
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
    )
}