const { useState, useEffect } = React

export function BookFilter({ onSetFilter, filterBy }) {
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

	useEffect(() => {
		onSetFilter(filterByToEdit)
	}, [filterByToEdit])

	function handleChange({ target }) {
		const field = target.name
		const value = target.type === 'number' ? +target.value : target.value
		setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
	}

	const { title, price, pageCount, published  } = filterByToEdit

	return (
		<section className="books-filters-container">

			<h2 className="filter-header">Filter Books</h2>

			<div className="books-filters flex justify-center">

				<div className="filter-section">
					<label htmlFor="byTitle" className="label">Title</label>
					<input type="text" id="byTitle" name="title" value={title} onChange={handleChange} className="input" placeholder="Search by title" />
				</div>

				<div className="filter-section">
					<label htmlFor="byAuthor" className="label">Price</label>
					<input type="number" id="price" name="price" value={price || ''} onChange={handleChange} className="input" placeholder="Search by price" />
				</div>

				<div className="filter-section">
					<label htmlFor="byPageCount" className="label">Page Count</label>
					<input type="number" id="pageCount" name="pageCount" value={pageCount || ''} onChange={handleChange} className="input" placeholder="Search by page count" />
				</div>

				<div className="filter-section">
					<label htmlFor="byPublished" className="label">Published</label>
					<input type="number" id="published" name="published" value={published || ''} onChange={handleChange} className="input" placeholder="Search by published year" />
				</div>

			</div>
		</section>
	)
}