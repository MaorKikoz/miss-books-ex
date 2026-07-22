export function AppHeader({ page = 'home', onSetPage }) {

    return <header className="app-header full main-layout">
        <section className="header-container">
            <h1>React Starter Proj</h1>
            <nav>
                <a href="#" className={(page === 'Home') ? 'active' : ''}
                    onClick={(ev) => onSetPage('Home')}>
                    Home
                </a>
                <span> | </span>
                <a href="#" className={(page === 'About') ? 'active' : ''}
                    onClick={(ev) => onSetPage('About')}>
                    About
                </a>
                <span> | </span>
                <a href="#" className={(page === 'Books') ? 'active' : ''}
                    onClick={(ev) => onSetPage('Books')}>
                    Books
                </a>

            </nav>
        </section>
    </header>
}
