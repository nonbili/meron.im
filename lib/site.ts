export const GITHUB_URL = "https://github.com/nonbili/meron";
export const RELEASES_URL = "https://github.com/nonbili/meron/releases";
export const CONTACT_EMAIL = "hi@meron.im";


// Direct binary downloads. The `latest/download` path always resolves to the
// newest published release, so these never need bumping per version.
const DOWNLOAD_BASE = "https://github.com/nonbili/meron/releases/latest/download";

type DownloadLink = {
  label: string;
  file?: string;
  url?: string;
};

export const DOWNLOADS: Record<"macOS" | "Windows" | "Linux" | "Mobile", readonly DownloadLink[]> = {
  macOS: [
    { label: "App Store", url: "https://apps.apple.com/us/app/meron-mail/id6782740236" },
    { label: "Apple silicon (.dmg)", file: "meron-darwin-arm64.dmg" },
    { label: "Intel (.dmg)", file: "meron-darwin-amd64.dmg" },
  ],
  Windows: [
    { label: "Microsoft Store", url: "https://apps.microsoft.com/detail/9pcjrrdcwd7x" },
    { label: "Installer (.exe)", file: "meron-windows-amd64.exe" },
    { label: "Portable (.zip)", file: "meron-windows-amd64-portable.zip" },
  ],
  Linux: [
    { label: "Flathub", url: "https://flathub.org/apps/jp.nonbili.meron" },
    { label: "Snap", url: "https://snapcraft.io/meron" },
    { label: "AppImage", file: "meron-linux-amd64.AppImage" },
    { label: "Tarball (.tar.gz)", file: "meron-linux-amd64.tar.gz" },
  ],
  Mobile: [
    { label: "Google Play", url: "https://play.google.com/store/apps/details?id=jp.nonbili.meron" },
    { label: "F-Droid", url: "https://f-droid.org/packages/jp.nonbili.meron/" },
    { label: "App Store", url: "https://apps.apple.com/us/app/meron-mail/id6782740236" },
  ],
};

export const downloadUrl = (file: string) => `${DOWNLOAD_BASE}/${file}`;
