import Block from "./block.model";
import Link from "./link.model";
export default interface Flow {
  name: string;
  blocks: Block[];
  links: Link[];
}
