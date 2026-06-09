import logo from "@/assets/logo.png";
import cricketBall from "@/assets/cricket-ball.png";
import facebook from "@/assets/facebook.png";
import instagram from "@/assets/instagram.png";
import tiktok from "@/assets/tiktok.png";
import youtube from "@/assets/youtube.png";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface">
      <img
        src={cricketBall}
        alt=""
        loading="lazy"
        className="pointer-events-none absolute right-4 top-1/2 hidden h-[260px] w-auto -translate-y-1/2 select-none md:block lg:right-10"
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:grid-cols-3">
        <div>
          <img src={logo} alt="CricSea" className="h-9 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-text-primary">
            Make club management easier with CricSea automate game tracking and create a better, more professional experience for every player.
          </p>
          <h4 className="mt-8 text-base font-bold text-text-primary">Follow Us</h4>
          <p className="mt-1 text-xs text-text-secondary">Stay connected for the latest updates and news.</p>
          <div className="mt-3 flex items-center gap-3">
            <a href="#" aria-label="Facebook"><img src={facebook} alt="Facebook" className="h-8 w-8 rounded-full" /></a>
            <a href="#" aria-label="X" className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white text-sm font-bold">𝕏</a>
            <a href="#" aria-label="Instagram"><img src={instagram} alt="Instagram" className="h-8 w-8 rounded-full" /></a>
            <a href="#" aria-label="TikTok"><img src={tiktok} alt="TikTok" className="h-8 w-8 rounded-full" /></a>
            <a href="#" aria-label="YouTube"><img src={youtube} alt="YouTube" className="h-8 w-8 rounded-full" /></a>
          </div>
        </div>
        <div>
          <h4 className="text-base font-bold text-text-primary">CricSea</h4>
          <ul className="mt-3 space-y-2 pl-5 text-sm text-text-primary list-disc marker:text-text-muted">
            {["Home", "About Us", "Contact Us", "Terms & Conditions", "Privacy Policy"].map((l) => (
              <li key={l}>
                <a href="#" className="link-underline inline-block hover:text-primary">{l}</a>
              </li>
            ))}
          </ul>
        </div>
        <div />
      </div>
      <div className="bg-surface-secondary py-4 text-center text-sm font-semibold text-text-primary">
        Copyright © 2026, CricSea. All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
