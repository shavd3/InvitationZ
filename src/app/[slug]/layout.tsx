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
    if (audio.muted || !audio.paused) return;
    audio.play().catch(function () {});
  }

  var unlockOpts = { capture: true, passive: true };
  document.addEventListener('pointerdown', tryPlay, unlockOpts);
  document.addEventListener('touchstart', tryPlay, unlockOpts);
  document.addEventListener('click', tryPlay, unlockOpts);
  document.addEventListener('keydown', tryPlay);
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
