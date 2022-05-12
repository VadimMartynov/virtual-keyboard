function keyboardLoad(num) {
    let div = '';
    let n=1;
    let s=0;
    for (let i=0;i<mas.length;i++) {
        div = document.createElement('div');
        div.className = 'mainLine';
        for (let j=0;j<mas[i].length;j++) {
            if  (words.includes(mas[i][j][num]) && mas[i][j][num].length>1) {
                div.innerHTML += `<div class="button register letter${n++}" onclick='buttonPush("${mas[i][j][num]}","${n-1}")'>${mas[i][j][num]}</div>`;
                buttonTable[n-1] = [n-1,mas[i][j][num]];
            } else {
                if (mas[i][j][num] == '\\' || mas[i][j][num] == '\'' || mas[i][j][num] == '\"') {
                    if (mas[i][j][num] == '\\') {
                        div.innerHTML += `<div class="button letter letter${n++}" onclick='buttonPush("spec1","${n-1}")'>\\</div>`;
                        buttonTable[n-1] = [n-1,mas[i][j][num]];
                    }
                    if (mas[i][j][num] == '\'') {
                        div.innerHTML += `<div class="button letter letter${n++}" onclick='buttonPush("spec2","${n-1}")'>\'</div>`;
                        buttonTable[n-1] = [n-1,mas[i][j][num]];
                    }
                    if (mas[i][j][num] == '\"') {
                        div.innerHTML += `<div class="button letter letter${n++}" onclick='buttonPush("spec3","${n-1}")'>\"</div>`;
                        buttonTable[n-1] = [n-1,mas[i][j][num]];
                    }
                } else {
                    div.innerHTML += `<div class="button letter letter${n++}" onclick='buttonPush("${mas[i][j][num]}","${n-1}")'>${mas[i][j][num]}</div>`;
                    buttonTable[n-1] = [n-1,mas[i][j][num]];
                }
                  }
            
        }
        form.append(div);
    }
}

function buttonPush(sym,count) {
    let t = document.querySelector('textarea');
    let start = t.selectionStart;
	let end = t.selectionEnd;
    let arrow = 0;
    let k=0;
    if (count == 55 || count == 63 || count == 64 || count == 65) {
        arrow = 1;
    }
    if ((sym.length==1 || sym.includes('spec')) && arrow == 0) {
        
	    let finText = t.value.substring(0, start) + (sym.includes('spec1') ? "\\" : 
                                                    (sym.includes('spec2') ? "\'" :
                                                    (sym.includes('spec3') ? "\"" : sym))) + t.value.substring(end);
	    t.value = finText;
        t.focus();
        t.selectionEnd = (start + 1);

    }
    
    if (sym == 'Backspace') {
	    let finText = (start == end) ? t.value.substring(0, start-1) + t.value.substring(end)
                                     : t.value.substring(0, start) + t.value.substring(end);
	    t.value = finText;
        t.focus();
        t.selectionEnd = (start==end) ? start-1 : start ;
    }
    if (arrow == 1) {
        let value = t.value;
        let lines = value.split('\n');
        let linesLength = 0;
        t.focus();
        if (count == 55) {
            
                let k=0;
                for (let i=0;i<lines.length;i++) {
                    if (linesLength>start) {
                        k=i-1;
                      
                        break;
                    } else {
                        linesLength += lines[i].length+1;
                        k=i;
                    }
                }
                
                (k==0) ? t.selectionEnd = 0 : t.selectionEnd-=lines[k-1].length+1; 
                
            }
        if (count == 63) {
            t.selectionEnd = (start==end) ? start-1 : start ;
        }
        if (count == 64) {
            let k=0;
                for (let i=0;i<lines.length;i++) {
                    if (linesLength>start) {
                        k=i-1;
                      
                        break;
                    } else {
                        linesLength += lines[i].length+1;
                        k=i;
                    }
                }
                
                (k==lines.length) ? t.selectionStart = linesLength : t.selectionStart+=lines[k].length+1; 
        }
        if (count == 65) {
            t.selectionStart = (start==end) ? start+1 : end ;
        }
    }
    if (sym == 'DEL') {
	    let finText = (start == end) ? t.value.substring(0, start) + t.value.substring(end+1)
                                     : t.value.substring(0, start) + t.value.substring(end);
	    t.value = finText;
        t.selectionEnd = (start==end) ? start : start  ;
    }
    if (sym == 'Enter') {
        let finText = t.value.substring(0, start) + "\r\n" + t.value.substring(start);
        t.value = finText;
        t.focus();
        t.selectionEnd = start+1;
    }
    if (sym == 'Ctrl') {
        if (alt == 0) {
            ctrl = 1;
        } else {
            alt = 0;
            ctrl = 0;
            switchLanguage();
        }
        k = 1;
    }
    if (sym == 'Alt') {
        if (ctrl == 0) {
            alt = 1;
        } else {
            alt = 0;
            ctrl = 0;
            switchLanguage();
        }
        k = 1;
    }
    if (shift == 1 || shift == 3) {
        if (language=='en') {
            number=number == 1 ? 0 : 1;
        } else {
            number=number == 3 ? 2 : 3;
        }
        shift == 1 ? shift= 0: shift = 2;
        removeKey(number);
        return;
    } 

    if (sym == 'Shift') {
        if (language=='en') {
            number=number == 1 ? 0 : 1;
            shift=1;
        } else {
            number=number == 3 ? 2 : 3;
            shift=3;
        }
        
        
        removeKey(number);
    }

    if (sym == 'Caps Lock') {
        if (language=='en') {
        number=number == 1 ? 0 : 1;
    } 
        else {
        number=number == 3 ? 2 : 3;
        }
        removeKey(number);
    }
    if (sym == 'Tab') {
        specButtons(sym);
    }
    if (k!=1) {
        ctrl=0;
        alt=0;
    }
    buttonRemoveHover()
    buttonHover(count);
}

function removeKey(num) {
    let remove = document.querySelectorAll('.mainLine');
    remove.forEach(elem => elem.remove());
    keyboardLoad(num);
}

function buttonRemoveHover() {
    let removeHover = document.querySelectorAll('.button');
    removeHover.forEach(elem=> {
        if (elem.classList.contains('hover')) { 
            elem.classList.remove('hover');
        }
    });
}

function buttonHover(count) {
    if (count == 43) {
        let str='.letter56';
        let hover = document.querySelector(str);
        hover.classList.add('hover');
    }
    if (count == 56) {
        let str='.letter43';
        let hover = document.querySelector(str);
        hover.classList.add('hover');
    }
    if (count == 57) {
        let str='.letter62';
        let hover = document.querySelector(str);
        hover.classList.add('hover');
    }
    if (count == 62) {
        let str='.letter57';
        let hover = document.querySelector(str);
        hover.classList.add('hover');
    }
    if (count == 59) {
        let str='.letter61';
        let hover = document.querySelector(str);
        hover.classList.add('hover');
    }
    if (count == 61) {
        let str='.letter59';
        let hover = document.querySelector(str);
        hover.classList.add('hover');
    }
    let str='.letter'+count;
    let hover = document.querySelector(str);
    hover.classList.add('hover');
}

function runOnKeys(func, ...codes) {
    let pressed = new Set();

    document.addEventListener('keydown', function(event) {
      pressed.add(event.key);
      for (let code of codes) {
        if (!pressed.has(code)) {
          return;
        }
      }
      func();
    });
    document.addEventListener('keyup', function(event) {
      pressed.delete(event.key);
    });

  }

function specButtons(sym) {
    let t = document.querySelector('textarea');
    let start = t.selectionStart;
    if (sym == 'Shift') {
        if (language =='en') {
            number=number == 1 ? 0 : 1;
            shift=1;
        } else {
            number=number == 3 ? 2 : 3;
            shift=3;
        }
        removeKey(number);
    }
    if (sym == 'CapsLock') {
        if (language == 'en') {
            number=number == 1 ? 0 : 1;
        removeKey(number);
        } else {
            number=number == 3 ? 2 : 3;
            removeKey(number);
        }
        
    }
    if( sym == 'Tab') {    
        let finText = t.value.substring(0, start) + "   " + t.value.substring(start);
        t.value = finText;
        t.focus();
        t.selectionEnd = start+3;
    }

}

function saveToLocalStorage() {
    localStorage.setItem('language', language);
}

function switchLanguage() {
    if (language == 'en') {
        language = 'ru';
        number +=2;
        end.innerHTML = 'Эта виртуальная клавиатура была создана в windows<br>CTRL+ALT - чтобы поменять раскладку(Мышкой или клавиатурой)';

    } else {
        language = 'en';
        number -=2;
        end.innerHTML = 'This virtual keyboard created in windows system<br>CTRL+ALT - to change language(Mouse or keyboard)';
      }
    saveToLocalStorage();
    removeKey(number);
}

let mas = [[['~','`','Ё','ё'],['!','1','!','1'],['@','2','"',"2"],['#','3','№','3'],
            ['$','4',';','4'],['%','5','%','5'],['^','6',':','6'],['&','7','?','7'],['*','8','*','8'],
            ['(','9','(','9'],[')','0',')','0'],['_','-','_','-'],['+','=','+','='],
            ['Backspace','Backspace','Backspace','Backspace']],
           [['Tab','Tab','Tab','Tab'],['Q','q','Й','й'],['W','w','Ц','ц'],['E','e','У','у'],['R','r','К','к'],
            ['T','t','Е','е'],['Y','y','Н','н'],['U','u','Г','г'],['I','i','Ш','ш'],['O','o','Щ','щ'],
            ['P','p','З','з'],['{','[','Х','х'],['}',']','Ъ','ъ'],['\\','\/','\\','\/'],['DEL','DEL','DEL','DEL']],
           [['Caps Lock','Caps Lock','Caps Lock','Caps Lock'],['A','a','Ф','ф'],['S','s','Ы','ы'],['D','d','В','в'],
           ['F','f','А','а'],['G','g','П','п'],['H','h','Р','р'],['J','j','О','о'],['K','k','Л','л'],
           ['L','l','Д','д'],[':',';','Ж','ж'],['"',"'",'Э','э'],['Enter','Enter','Enter','Enter']],
           [['Shift','Shift','Shift','Shift'],['\\','\\','\\','\\'],['Z','z','Я','я'],['X','x','Ч','ч'],['C','c','С','с'],
           ['V','v','М','м'],['B','b','И','и'],['N','n','Т','т'],['M','m','Ь','ь'],['<','.','Б','б'],
           ['>',',','Ю','ю'],['\/','\/',',','.'],['&#9650;','&#9650;','&#9650;','&#9650;'],['Shift','Shift','Shift','Shift']],
           [['Ctrl','Ctrl','Ctrl','Ctrl'],['Win','Win','Win','Win'],['Alt','Alt','Alt','Alt'],
           ['&nbsp;','&nbsp;','&nbsp;','&nbsp;'],['Alt','Alt','Alt','Alt'],['Ctrl','Ctrl','Ctrl','Ctrl'],
           ['&#9668;','&#9668;','&#9668;','&#9668;'],['&#9660;','&#9660;','&#9660;','&#9660;'],['&#9658;','&#9658;','&#9658;','&#9658;']]];
let words = '` ~ Tab Caps Lock Shift Ctrl Win Alt &#9668; &#9660; &#9658; &#9650; Enter DEL Backspace';
let language = localStorage.getItem('language') || 'en';
let number = (language == 'en') ? 1: 3;
let caps = 'small';
let shift = 0,ctrl=0,alt=0;
let upper = (['big','small']);
let form = document.createElement('form');
let buttonTable = [];
form.className = 'mainForm';
form.innerHTML = "<textarea></textarea><div class='mainDiv'></div>"
document.body.append(form);

keyboardLoad(number);
let text = document.querySelector('textarea');
text.addEventListener('keydown',function(event) {
   let k = 0;
   
   if (event.key == 'CapsLock') {
        specButtons(event.key);
        buttonHover(30);
    }
    if (event.key == 'Control') {
        buttonHover(57);
    }
    if (event.key == 'Meta') {
        buttonHover(58);
    }
    if (event.key == 'Delete') {
        buttonHover(29);
    }
    if (event.key == 'ArrowUp') {
        buttonHover(55);
    }
    if (event.key == 'ArrowLeft') {
        buttonHover(63);
    }    
    if (event.key == 'ArrowDown') {
        buttonHover(64);
    }    
    if (event.key == 'ArrowRight') {
        buttonHover(65);
    }
   for (let i=1;i<buttonTable.length;i++) {
        if (event.key == buttonTable[i][1]) {
            if (event.key == 'Tab') {
                event.preventDefault();
           }
            specButtons(buttonTable[i][1]);
            buttonHover(buttonTable[i][0]);
            break;
        }
    
   }
});

text.addEventListener('keyup',event => {
    buttonRemoveHover();
    if (event.key == 'shift') specButtons(event.key);
    
} );

runOnKeys(() => switchLanguage(),"Control","Alt");

let end = document.createElement('div');
end.className = 'os';
if (language == 'en' ) {
    end.innerHTML = 'This virtual keyboard created in windows system<br>CTRL+ALT - to change language(Mouse or keyboard)';
} else {
    end.innerHTML = 'Эта виртуальная клавиатура была создана в windows<br>CTRL+ALT - чтобы поменять раскладку(Мышкой или клавиатурой)';
}
document.body.append(end);