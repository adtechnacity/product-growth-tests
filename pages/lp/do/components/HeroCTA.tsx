export default function HeroCTA() {
  return (
    <div className="flex flex-col items-start">
      <h1 className="text-[42px] sm:text-[52px] font-bold text-text-primary leading-tight mb-5">
        Fly business class at economy prices.
        <br />
        <span className="not-italic text-[#3D6389]">it&apos;s kinda genius.</span>
      </h1>
      <p className="text-[17px] text-text-muted mb-8 leading-relaxed max-w-[480px]">
        A free browser extension that quietly finds you the same seat, same flight, same class, for less.
      </p>
      <a
        href="https://chromewebstore.google.com/detail/capital-one-shopping-save/nenlahapcbofgnanklpelkaejcehkggg?hl=en-US"
        target="_blank"
        rel="noopener noreferrer"
        className="btn px-10 h-[60px] bg-navy hover:bg-navy-hover text-white text-[18px] font-semibold rounded-lg transition-colors duration-150 inline-flex items-center gap-2"
      >
        Add to Chrome, it&apos;s free
      </a>
      <p className="mt-4 text-[13px] text-text-muted">Free to use · Takes 30 seconds</p>
    </div>
  );
}
