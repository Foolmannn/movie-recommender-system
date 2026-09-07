export default function Navbar() {
    return (
        <nav className="border-b border-zinc-800">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

                <h1 className="text-xl font-bold">
                    🎬 CineMind
                </h1>

                <div className="flex gap-6 text-sm text-zinc-400">

                    <a href="/" className="hover:text-white">
                        Home
                    </a>

                    <a href="#" className="hover:text-white">
                        Discover
                    </a>

                    <a href="#" className="hover:text-white">
                        About
                    </a>

                </div>

            </div>

        </nav>
    );
}