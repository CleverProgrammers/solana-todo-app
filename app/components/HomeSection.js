export default function HomeSection() {
    return (
        <section className="min-h-screen relative bg-home flex flex-col">
            <nav role="navigation" aria-label="Main" className="w-full md:p-10 p-5 flex gap-4 justify-between items-center">
                <a href="#" className="text-center">
                    <h1 className="text-4xl text-primary font-[AnekMalayalamExtraBold]">SHIFT</h1>
                    <h4 className="text-base text-white font-[AnekMalayalamLight]">Powered by Blocksmith Labs</h4>
                </a>

                <div className="flex gap-8 items-center">
                    <a href="#">
                        <span className="text-white text-xl">
                            <i className="fab fa-twitter"></i>
                        </span>
                    </a>
                    <a href="#">
                        <span className="text-white text-xl">
                            <i className="fab fa-discord"></i>
                        </span>
                    </a>
                    <div className="rounded-xl border-2 border-primary px-6 py-2 text-white text-lg h-fit hover:font-bold md:block hidden">Projects, apply here</div>
                </div>
            </nav>
            <div className="relative flex flex-col flex-1 items-center justify-center">
                <img className="lg:h-64 h-42" src="imgs/shift_logo.png" alt="Shift" />
                <h2 className="lg:text-[50px] text-[36px] text-white text-center">Supercharge your NFTs</h2>
            </div>
            <div className="section-divider"></div>
        </section>
    )
}
