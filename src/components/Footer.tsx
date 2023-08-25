import React from "react";

function Footer() {
    return (
        <footer className="border-t-2 p-6 border-night mt-10">
    <div className="container mx-auto text-white space-y-4">
        <div className="text-center sm:text-left">
            <p className="text-lg font-semibold mb-2">🚧 Initial Version Notice</p>
            <p>This is a prototype of the application. We're refining features based on feedback and observations.</p>
        </div>

        <div className="text-center sm:text-left">
            <p className="text-lg font-semibold mb-2">📢 Feedback & Contributions</p>
            <p>Reach out on Discord: <strong>rustypeach</strong> or visit our <a href="https://github.com/DanielLChapman/Palia-Garden" target="_blank" className="text-indigo-400 hover:text-indigo-600 underline">GitHub repository</a>.</p>
        </div>

        <div className="text-center sm:text-left">
            <p className="text-lg font-semibold mb-2">🌱 App Behavior</p>
            <p>Crafters rely on crop counts. Insufficient crops won't display options in the seed crafter. Recalculations occur with grid/day changes. Known bugs are in review.</p>
        </div>

        <div className="text-center sm:text-left">
            <p className="text-lg font-semibold mb-2">🔮 What's Next?</p>
            <p>We're adding star seeds for profit boosts, introducing fertilizers, and designing a vibrant color palette.</p>
        </div>
    </div>
</footer>

    );
}

export default Footer;
