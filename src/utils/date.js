export function dateSeconds(){
  let d = new Date();
  return Number(d.getTime().toString().substr(0, 10));
}
