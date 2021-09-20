export function consoleLog(params) {
  const devMode = __DEV_MODE;
  if(devMode){
    console.log(consoleLog);
  }
}
/** Dispatch event on click outside of node */
export function clickOutside(node) {
    const handleClick = (event) => {
    //   console.log(node && !node.contains(event.target) && !event.defaultPrevented);
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(new CustomEvent("click_outside", node));
      }
    };
  
    document.addEventListener("click", handleClick, true);
  
    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      },
    };
  }

  // dec2hex :: Integer -> String
// i.e. 0-255 -> '00'-'ff'
function dec2hex(dec) {
  return dec < 10 ? "0" + String(dec) : dec.toString(16);
}

// generateId :: Integer -> String
export function generateId(len) {
  var arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}

export function zoomImg(imgUrl, targetModalImg = "#modalImg") {
  let target = document.querySelector(targetModalImg);
  if(target){
    target.src = imgUrl;
    return true;
  }else{
    target.src = "";
  }

  return false;
}

export function indexToAlfa(index = false, capitalize = false){
  if(!index){
    return '';
  }
  
  var str = "abcdefghijklmnopqrstuvwxyz";
  console.log(str[index]);
  if(capitalize){
    return str[index].toUpperCase()
  }else{
    return str[index]
  }
}

export const formatDate = function(dateStr){
  let x = new Date(dateStr);
  return x.toLocaleDateString();
}