export default function imageLoader({ src }: { src: string; width?: number; quality?: number }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (process.env.GITHUB_ACTIONS ? "/RKDF-Dubaii" : "");
  if (src.startsWith("/") && !src.startsWith(basePath)) {
    return `${basePath}${src}`;
  }
  return src;
}
