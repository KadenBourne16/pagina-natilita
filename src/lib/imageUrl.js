import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/lib/client"; // wherever your sanity client is

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
