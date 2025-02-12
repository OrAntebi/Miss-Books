const { useState } = React

export function LongText({ text, length = 100 }) {
    const [isExpanded, setIsExpanded] = useState(false)

    function toggleExpand() {
        setIsExpanded(!isExpanded)
    }

    const displayText = isExpanded
        ? text
        : text.slice(0, length) + (text.length > length ? "..." : "")

    return (
        <p>
            {displayText}
            {text.length > length && (
                <span onClick={toggleExpand} className="show-more">
                    {isExpanded ? "Show Less" : "Show More"}
                </span>
            )}
        </p>
    )
}