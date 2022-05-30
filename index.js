$(document).ready(function () {
    var kiwi = {}

    $("#generateArray").click(function() {       
        var array = []

        var long = 28;
        var sizeMax = 500;
        var sizeMin = Math.round(100 * 30 / 100); 

        for (var i = 0; i < long; i++) {
            var value = getRandomvar(sizeMin, sizeMax)

            if(array.find(x => x == value) == null || array.length < 1){
                array.push(value)
                drawing(array[i], i, 0)
            }
            else{
                i--
            }
        }
                
        kiwi = array.map((value, index) => {
            return{
                lunghezza: value,
                position: "",
                preOrder: index,
                postOrder: 0,
            }    
        })
    
        var kiwiLunghezzaArray = createArrayByKiwi(0)
        var array = getOrdinateArray(kiwiLunghezzaArray)
        
        getPostOrdinateKiwi(array)

        console.log(kiwi)
    })

    $("#simpleMode").click(function () {
        var array = createArrayByKiwi(0)
        array.sort(function(a, b){
            return a - b 
        })

        var counter = 0;
        const i = setInterval(function(){
            drawing(array[counter], counter, 1)

            counter++
            if(counter > array.length){
                clearInterval(i);
            }
                
        }, 300);  
        
        console.log(kiwi)
    })

    $("#changeMode").click(function(){
        var arrayOrdered = createArrayByKiwi(0)
        var ind = 0;
        //var max = array.length;

        var nextStep = true
        var index = 0
        var arrayPosition = 0
        var indexPrev = 0
        var change = false;

        var index2 = 0
        var valuePrev = 0
        var value =  0

        var arrayOrdered = arrayOrdered.sort(function(a, b){
            return a - b 
        })

        var array = createArrayByKiwi(0)
        var array2 = createArrayByKiwi(0)
        
        //console.log(arrayOrdered)
        //console.log(array)

        var timer = setInterval(()=>{
            //console.log("")

            if(change == true){
                change = false

                var c = document.getElementById("arrayPosition");
                var ctx = c.getContext("2d");

                var grd = ctx.createLinearGradient(0, 0, 170, 0);

                grd.addColorStop(0, "red");                    
                ctx.fillStyle = grd;
                ctx.fillRect((35 * indexPrev) + 10, 20, 35, value);

                grd.addColorStop(0, "white");
                ctx.fillStyle = grd;
                ctx.fillRect((35 * indexPrev) + 35, 20, 10, value);

            }

            if(nextStep == true){
                index = array.findIndex(x => x == arrayOrdered[arrayPosition])
                value = arrayOrdered[arrayPosition]
                //distance = max - index     
                
                //console.log("index: " + index)
                //console.log("value: " + value)

                nextStep = false
            }

            if(nextStep == false){
                if(index - ind - 1 > -1)
                {
                    index2 = array.findIndex(x => x == arrayOrdered[arrayPosition])
                    valuePrev = array[index - ind - 1]
                    value =  array[index - ind]
                    indexPrev = array.findIndex(x => x == array[index - ind - 1])

                    //console.log("value: " + value)
                    //console.log("index2: " + index2)
                    //console.log("valuePrev: " + valuePrev)
                    //console.log("indexPrev: " + indexPrev)
                    //console.log("ind: " + ind)

                    if(value < valuePrev){
                        var c = document.getElementById("arrayPosition");
                        var ctx = c.getContext("2d");

                        var grd = ctx.createLinearGradient(0, 0, 170, 0);

                        grd.addColorStop(0, "white");
                        ctx.fillStyle = grd;
                        ctx.fillRect((35 * indexPrev) + 10, 20, 35, 900);

                        grd.addColorStop(0, "blue");
                        
                        ctx.fillStyle = grd;
                        ctx.fillRect((35 * indexPrev) + 10, 20, 35, value);

                        grd.addColorStop(0, "white");
                        ctx.fillStyle = grd;
                        ctx.fillRect((35 * indexPrev) + 35, 20, 10, value);

                        grd.addColorStop(0, "red");
                        
                        ctx.fillStyle = grd;
                        ctx.fillRect((35 * index2) + 10, 20, 35, valuePrev);

                        grd.addColorStop(0, "white");
                        ctx.fillStyle = grd;
                        ctx.fillRect((35 * index2) + 35, 20, 10, valuePrev);

                        array[indexPrev] = value
                        array[index2] =  valuePrev

                        //console.log("array: " + array)

                        change = true
                    }
                    
                }
            }

            if(arrayPosition >= array.length){
                clearInterval(timer);
            }
            else if(ind < index) {
                //console.log("ind ++")
                ind ++
            }
            else{
                //console.log("arrayPosition ++")
                nextStep = true
                arrayPosition ++
                ind = 0
            }

        }, 50);
            
    })



    function getPostOrdinateKiwi(array){
        array.forEach((value, index) => {
            var findItem = kiwi.find(x => x.lunghezza == value)
            findItem.postOrder = index
        })
    }
   
    function getOrdinateArray(array) {
        for (var i = 0; i < array.length; i++)
        {
            for (var j = 0; j < array.length - 1; j++)
            {
                if (array[j + 1] < array[j])
                {
                    var temp = array[j + 1]; 
                    array[j + 1] = array[j]; 
                    array[j] = temp; 
                }
            }
        }       
        return array;
    }

    function createArrayByKiwi(type){
        var array = []
        for(let i = 0; i < kiwi.length; i++){
            if(type == 0)
                array.push(kiwi[i].lunghezza)
            else if(type == 1)
                array.push(kiwi[i].preOrder)
            else if(type == 2)
                array.push(kiwi[i].postOrder)
        }
        return array;
    }
 
    function drawing(long, nItem, type) {
        var c = document.getElementById("arrayPosition");
        var ctx = c.getContext("2d");

        var grd = ctx.createLinearGradient(0, 0, 170, 0);

        grd.addColorStop(0, "white");
        ctx.fillStyle = grd;
        ctx.fillRect((35 * nItem) + 10, 20, 35, 900);
        
        if(type == 0)
            grd.addColorStop(0, "red");
        else
            grd.addColorStop(0, "blue");
        
        ctx.fillStyle = grd;
        ctx.fillRect((35 * nItem) + 10, 20, 35, long);
        
        grd.addColorStop(0, "white");
        ctx.fillStyle = grd;
        ctx.fillRect((35 * nItem) + 35, 20, 10, long);

        if(type != 0){
            const i = setInterval(function(){
                grd.addColorStop(0, "red");
                ctx.fillStyle = grd;
                ctx.fillRect((35 * nItem) + 10, 20, 35, long);
    
                grd.addColorStop(0, "white");
                ctx.fillStyle = grd;
                ctx.fillRect((35 * nItem) + 35, 20, 10, long)

                clearInterval(i);         
           }, 300);
        }
    }

    function getScreenResolution(type) {
        if (type == "x")
            return window.screen.width * window.devicePixelRatio
        else
            return window.screen.height * window.devicePixelRatio
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getRandomvar(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
})