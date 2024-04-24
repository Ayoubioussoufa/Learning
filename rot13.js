function rot13(str) {
    let num = [];
    for (let i = 0; i < str.length; i++)
    {
        if( str[i].toUpperCase() != str[i].toLowerCase() )  {
            if (str.charCodeAt(i) > 77)
                num.push(str.charCodeAt(i) - 13);
            else
                num.push(str.charCodeAt(i) + 13);
        }
        else
            num.push(str.charCodeAt(i));
    }
    str = String.fromCharCode(...num);
    return str;
}
  
console.log(rot13("SERR PBQR PNZC"));