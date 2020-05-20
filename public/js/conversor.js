function DECIMAL_B(){
    var n = document.getElementById("numero1").value;
    var numero = n;
    var res = document.getElementById("res1");
    if(verificandoB(numero)){
        res.innerHTML = n + " Binário = " + decimal_b(numero, 0, 0) + " Decimal";
    }
    else res.innerHTML = 'Inválido.'
}

function verificandoB(numero){
    for(var i=0; i<numero.length;i++){
        if(numero.charAt(i)!='1' && numero.charAt(i)!='0'){
            return false;
        }
    }
    return true;
}

function decimal_b(numero, i, soma){
    if(numero==0){
        return soma;
    }
    else{
        if(numero%10==1){
            soma= soma + Math.pow(2,i);
        }
        return decimal_b(Math.round(numero/10), i+1, soma);
    }
}

//////////////////////////////////////

function BINARIO(){
    var n = document.getElementById("numero1").value;
    var numero = n;
    var res = document.getElementById("res1");
    var t = [];
    var x = "";
    
    if(verificandoDecimal(numero))
    {
        for(var i=0; numero>0; i++){
            t[i] = numero%2;
            numero = Math.trunc(numero/2);
        }

        for(var j=t.length-1;j>=0;j--){
            x += t[j];
        }
        res.innerHTML = n +" Decimal = " + x +  " Binário";
    }else res.innerHTML = "Inválido."
}

function verificandoDecimal(numero){
    var x = numero/10;
    if(x>0){
        return true;
    }else return false;
}

///////////////////////////////////////////////////////

function DECIMAL_O(){
    var n = document.getElementById("numero2").value;
    var numero = n;
    var res = document.getElementById("res2");
    if(verificandoO(numero)){
        res.innerHTML = n + " Octal = " + decimal_o(numero, 0, 0) + " Decimal";
    }
    else res.innerHTML = 'Inválido.'
}

function verificandoO(numero){
    for(var i=0; i<numero.length;i++){
        if(numero.charAt(i)!='0' && numero.charAt(i)!='1' &&
           numero.charAt(i)!='2' && numero.charAt(i)!='3' &&
           numero.charAt(i)!='4' && numero.charAt(i)!='5' &&
           numero.charAt(i)!='6' && numero.charAt(i)!='7'){
            return false;
        }
    }
    return true;
}

function decimal_o(numero, i, soma){
    if(numero==0){
        return soma;
    }
    else{
        if(numero%10>0  && numero%10<8){
            soma= soma + (numero%10 * Math.pow(8,i));
        }
        return decimal_o(Math.trunc(numero/10), i+1, soma);
    }
}

//////////////

function OCTAL(){
    var n = document.getElementById("numero2").value;
    var numero = n;
    var res = document.getElementById("res2");
    var t = [];
    var x = "";
    
    if(verificandoDecimal(numero))
    {
        for(var i=0; numero>0; i++){
            t[i] = numero%8;
            numero = Math.trunc(numero/8);
        }

        for(var j=t.length-1;j>=0;j--){
            x += t[j];
        }
        res.innerHTML = n + " Decimal = " + x + " Octal";
    }else res.innerHTML = "Inválido."
}

////////////////

function DECIMAL_H(){
    var n = document.getElementById("numero3").value;
    var numero = n;
    var res = document.getElementById("res3");
    if(verificandoH(numero)){
        res.innerHTML = n + " Hexa = " + decimal_h(numero, 0, 0) + " Decimal";
    }
    else res.innerHTML = 'Inválido.'
}

function verificandoH(numero){
    for(var i=0; i<numero.length;i++){
        if(numero.charAt(i)!='0' && numero.charAt(i)!='1' &&
           numero.charAt(i)!='2' && numero.charAt(i)!='3' &&
           numero.charAt(i)!='4' && numero.charAt(i)!='5' &&
           numero.charAt(i)!='6' && numero.charAt(i)!='7' &&
           numero.charAt(i)!='8' && numero.charAt(i)!='9' &&
           numero.charAt(i)!='A' && numero.charAt(i)!='B' &&
           numero.charAt(i)!='C' && numero.charAt(i)!='D' &&
           numero.charAt(i)!='E' && numero.charAt(i)!='F'){
            return false;
        }
    }
    return true;
}

function verificandoHEXA(n){
    if(n >= '0' && n <= '9'){
        return n;
    }
    else if(n =='A'){
        return 10;
    }
    else if(n =='B'){
        return 11;
    }
    else if(n =='C'){
        return 12;
    }
    else if(n =='D'){
        return 13;
    }
    else if(n =='E'){
        return 14;
    }
    else if(n =='F'){
        return 15;
    }
    else return n;
}

function decimal_h(numero, i, soma){
    var x=0;
    for(i=numero.length-1; i>=0; i--){
        var n = verificandoHEXA(numero[i]);
        soma += (n * Math.pow(16,x));
        x++;
    }
    return soma;
}

///////////////////////////////////////

function HEXA(){
    var n = document.getElementById("numero3").value;
    var numero = n;
    var res = document.getElementById("res3");
    var t = [];
    var x = "";
    
    if(verificandoDecimal(numero))
    {
        for(var i=0; numero>0; i++){
            t[i] = verificandoHEXAIN(numero%16);
            numero = Math.trunc(numero/16);
        }

        for(var j=t.length-1;j>=0;j--){
            x += t[j];
        }
        res.innerHTML = n + " Decimal = " + x + " Hexa";
    }else res.innerHTML = "Inválido."
}

function verificandoHEXAIN(n){
    if(n >= '0' && n <= '9'){
        return n;
    }
    else if(n =='10'){
        return 'A';
    }
    else if(n =='11'){
        return 'B';
    }
    else if(n =='12'){
        return 'C';
    }
    else if(n =='13'){
        return 'D';
    }
    else if(n =='14'){
        return 'E';
    }
    else if(n =='15'){
        return 'E';
    }
    else return n;
}
