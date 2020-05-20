function control(){
  localStorage.setItem("minuto", JSON.stringify(document.querySelector('#mnts').value));
  localStorage.setItem("segundo", JSON.stringify(document.querySelector('#segs').value));
      
  localStorage.setItem("minuto2", JSON.stringify(document.querySelector('#mnts2').value));
  localStorage.setItem("segundo2", JSON.stringify(document.querySelector('#segs2').value));
      
  localStorage.setItem("contador", JSON.stringify(document.querySelector('#contador').value));
}

var pomodoroIntervalo = {
  started : false,
  minutes : 0,
  seconds : 0,
  interval : null,
  minutesINTDom : null,
  secondsINTDom : null,
  minutesDom : null,
  secondsDom: null,
  repetsDom: null,
  contagem: null,

  init : function(){
    var self = this;
    this.minutesINTDom = document.querySelector('#minutosINT');
    this.secondsINTDom = document.querySelector('#segundosINT');
    this.minutesDom = document.querySelector('#minutes');
    this.secondsDom = document.querySelector('#seconds');
    this.repetsDom = document.querySelector('#cont');

    if(this.contagem == null || this.contagem == 1){
      console.log("entrou no intervalo")
      this.contagem = JSON.parse(localStorage.getItem('contador'));
    }

    clearInterval(this.interval);

    console.log(this.contagem + " ESTA PORRA ")
    
    this.interval = setInterval(function(){
      self.intervalCallback.apply(self);
    }, 1000);

    self.intervalo.apply(self)
    
    document.querySelector('#reset').onclick = function(){
      reinicio();///////////////////////////////
    };  

    $("#work").attr("disabled", true)
    $("#stop").attr("disabled", true)
    $("#reset").attr("disabled", true)
    $('#button-addon2').attr("disabled",true)
  },

  reinicio : function(){
    console.log("ESTA PORRA CARALHO")
    this.contagem = JSON.parse(localStorage.getItem('contador'));
    console.log(this.contagem)
    return;
  },

  resetVariables : function(mins, secs, started){
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
  },

  intervalo : function(){
    this.resetVariables(JSON.parse(localStorage.getItem('minuto2')), JSON.parse(localStorage.getItem('segundo2')), true);
  },

  toDoubleDigit : function(num){
    if(num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  },
  updateDom : function(){
    this.minutesINTDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secondsINTDom.innerHTML = this.toDoubleDigit(this.seconds);
    document.title = "(" + this.minutesINTDom.innerHTML + ":" + this.secondsINTDom.innerHTML + ")"
  },

  intervalCallback : function(){
    if(!this.started) return false;
    if(this.seconds == 0) {
      if(this.minutes == 0) {
        this.timerComplete();
        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.updateDom();
  },
  timerComplete : function(){
    this.started = false;

    if(this.contagem == 1){
      clearInterval(this.interval);
      console.log("contador = 1")
    }
    if(this.contagem>1){ 
      this.contagem -= 1;
      this.repetsDom.innerHTML = this.verificando(this.contagem) ;
      this.minutesINTDom.innerHTML = JSON.parse(localStorage.getItem('minuto2'));
      this.secondsINTDom.innerHTML = JSON.parse(localStorage.getItem('segundo2'))
      document.querySelector('#minutes').innerHTML = JSON.parse(localStorage.getItem('minuto'));
      document.querySelector('#seconds').innerHTML = JSON.parse(localStorage.getItem('segundo'));
    }
    pomodoro.startWork();
  },

  verificando : function(n){
    if(n>= 0 && n <=9){
      return "0" + parseInt(n);
    }
  }
}

var pomodoro = {
    started : false,
    minutes : 0,
    seconds : 0,
    fillerHeight : 0,
    fillerIncrement : 0,
    interval : null,
    minutesDom : null,
    secondsDom : null,
    fillerDom : null,
    repetsDom: null,
    contagem: null,

    init : function(){
      var self = this;
      this.minutesDom = document.querySelector('#minutes');
      this.secondsDom = document.querySelector('#seconds');
      this.fillerDom = document.querySelector('#filler');      
      this.repetsDom = document.querySelector('#cont');

      if(this.contagem == null || this.contagem == 1){
        console.log("entrou")
        this.contagem = JSON.parse(localStorage.getItem('contador'));
      }

      console.log("- contador init " + this.contagem)
      
      var numero =JSON.parse(localStorage.getItem('contador'));
      if(numero<1){
        this.repetsDom.innerHTML = "SEM INICIO";
        return
      }

     // this.repetsDom.innerHTML = numero;

      clearInterval(this.interval);
      
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
       // this.title = "(" + this.minutesDom + ":" + this.secondsDom + ") OPB"
      }, 1000);

      self.startWork.apply(self);
      $('#button-addon2').attr("disabled",true)

      document.querySelector('#stop').onclick = function(){
        self.stopTimer.apply(self);
      };

      document.querySelector('#reset').onclick = function(){
        //pomodoroIntervalo.reinit();
        self.resetTimer.apply(self);
      };
    },
    
    resetVariables : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.fillerIncrement = 200/(this.minutes*60);
      this.fillerHeight = 0;  
    },
    startWork: function() {
      self = this;
      $("#work").attr("disabled", false)
      $("#stop").attr("disabled", false)
      $("#reset").attr("disabled", false)
      this.resetVariables(parseInt(this.minutesDom.innerHTML),parseInt(this.secondsDom.innerHTML), true);
      document.querySelector('#reset').onclick = function(){
        self.resetTimer.apply(self);
      };
      document.title += " - Rolando"
    },
    stopTimer : function(){
      this.resetVariables(this.minutesDom.innerHTML, this.secondsDom.innerHTML, false)
      this.updateDom();
      document.title += " - Parado"
    },
    resetTimer : function(){
      this.resetVariables(JSON.parse(localStorage.getItem('minuto')), JSON.parse(localStorage.getItem('segundo')), false);
      this.contagem = JSON.parse(localStorage.getItem('contador'));
      this.repetsDom.innerHTML = this.verificando(this.contagem) ;
      $('#button-addon2').attr("disabled",false)
      document.querySelector('#minutes').innerHTML = JSON.parse(localStorage.getItem('minuto'));
      document.querySelector('#seconds').innerHTML = JSON.parse(localStorage.getItem('segundo'));
      this.updateDom();
      document.title = "Pomodoro"
      pomodoroIntervalo.reinicio();
      return;
    },
    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },

    updateDom : function(){
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
      document.title = "(" + this.minutesDom.innerHTML + ":" + this.secondsDom.innerHTML + ")"
      this.fillerHeight = this.fillerHeight + this.fillerIncrement;
      this.fillerDom.style.height = this.fillerHeight + 'px';
    },

    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom();
    },

    timerComplete : function(){
      this.started = false;
      if(this.contagem>1){ 
        this.contagem -= 1;
        pomodoroIntervalo.init();
      }else{
        clearInterval(this.interval);
        audioInicio();
        console.log(this.contagem)
        document.title = "FINALIZADO"
        this.repetsDom.innerHTML = "FINALIZADO";
        return;
      }
    },
  
    verificando : function(n){
      if(n>= 0 && n <=9){
        return "0" + parseInt(n);
      }
    }
};
