$(document).ready(function () {
    var kiwi = {}

    $("#generateArray").click(function() {       
        var array = []

        var long = 7;
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
    })

    $("#simpleMode").click(function () {

        var kiwiLunghezzaArray = createArrayByKiwi(0)
        var array = getOrdinateArray(kiwiLunghezzaArray)
        
        getPostOrdinateKiwi(array)

        var counter = 0;
        const i = setInterval(function(){
            drawing(array[counter], counter, 1)

            counter++
            if(counter > array.length){
                clearInterval(i);
            }
                
        }, 300);        
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
        return array
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
        return array
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
            grd.addColorStop(0, "red");
            ctx.fillStyle = grd;
            ctx.fillRect((35 * nItem) + 10, 20, 35, long);

            grd.addColorStop(0, "white");
            ctx.fillStyle = grd;
            ctx.fillRect((35 * nItem) + 35, 20, 10, long)
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