const categories = [
    "All",
    "React",
    "JavaScript",
    "Node",
    "MongoDB",
    "CSS",
];

const FilterBar = ({ active, setActive }) => {
    return (
        <div className="sticky top-14 z-40 bg-black flex gap-3 overflow-x-auto pb-2 pt-2">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActive(cat)}
                    className={`px-4 py-1 rounded-full text-sm whitespace-nowrap ${active === cat
                            ? "bg-white text-black"
                            : "bg-zinc-800 text-white"
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default FilterBar;
