import Script from 'next/script';

const inviteMusicBoot = `
(function () {
  if (window.__inviteAudio) return;
  var audio = new Audio('/music/invite.mp3');
  audio.loop = true;
  audio.volume = 0.3;
  audio.preload = 'auto';
  audio.setAttribute('playsinline', '');
  window.__inviteAudio = audio;

  function tryPlay() {
    return audio.play().catch(function () {});
  }

  tryPlay();

  var attempts = 0;
  var burst = window.setInterval(function () {
    tryPlay();
    attempts += 1;
    if (!audio.paused || attempts >= 30) {
      window.clearInterval(burst);
    }
  }, 50);

  window.setTimeout(function () {
    window.clearInterval(burst);
  }, 1600);

  document.addEventListener('pointerdown', tryPlay, { once: true, passive: true });
  document.addEventListener('keydown', tryPlay, { once: true });
})();
`;

export default function SlugLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="invite-music-boot" strategy="beforeInteractive">
        {inviteMusicBoot}
      </Script>
      {children}
    </>
  );
}
