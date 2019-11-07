export default function rehypeDocs() {
  return function transformer(tree) {
    console.log(tree);
  };
}
