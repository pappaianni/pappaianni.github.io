class LandpageController
{
    TimeMSBetweenCharactersTitle = 200;
    TimeMSBetweenCharacters = 60;
    PrintIntervalID = -1;
    ElementsToDisplay = [];
    OnFinishCallback = undefined;

    /* Initialization Methods */

    Init()
    {
        this.InitializeElements();
        this.InitializeLanding();
    }

    InitializeLanding()
    {
        const that = this;
        const MainLogoTitle = document.getElementById("mainLogo");
        const MainLogoGlobe = document.getElementById("mainGloboImage");
        const MainLogoFace = document.getElementById("mainGloboFaceImage");

        MainLogoFace.classList.remove("poemFadeElement");
        MainLogoFace.classList.add("poemShowElement");
        
        setTimeout(function() {

            MainLogoGlobe.classList.remove("poemFadeElement");
            MainLogoGlobe.classList.add("poemShowElement");

            setTimeout(function() {
                
                MainLogoTitle.classList.remove("poemFadeElement");
                MainLogoTitle.classList.add("poemShowElement");

                setTimeout(function() {
                    MainLogoTitle.classList.add("interactuable");
                    MainLogoTitle.addEventListener("click", function(){
                        that.InitializeBody();
                    });
                }, 2000)

            }, 2000);

        }, 2000);
    }

    InitializeElements()
    {
        const PoemTextElements = document.getElementsByClassName("poemText");
        for(let Child of PoemTextElements)
        {
            const TextContent = Child.innerHTML;
            Child.innerHTML = "";
            for(let CharIndx = 0; CharIndx < TextContent.length; CharIndx++)
            {
                const TextChar = document.createElement("span");
                TextChar.classList.add("poemFadeElement");
                TextChar.innerHTML = TextContent[CharIndx];
                Child.append(TextChar);
            }
        }
    }

    InitializeBody()
    {
        const that = this;
        const MainLandpage = document.getElementById("mainLandpage");
        const BodyContainer = document.getElementById("bodyContainer");

        // Fade landpage.
        MainLandpage.classList.add("poemFadeElement");
        setTimeout(function(){
            MainLandpage.style.display = "none";
            BodyContainer.style.display = "";
            BodyContainer.classList.add("poemShowElement");
            setTimeout(function()
            {
                that.InitializePoemHeader();
            }, 3000);
        }, 3000);
    }

    InitializePoemHeader()
    {
        const that = this;

        /* Poem Header */

        this.OnFinishCallback = function() {            
            const PoemTitleContainer = document.getElementById("poemTitleContainer");
            const PoemBodyContainer = document.getElementById("poemBodyContainer");

            setTimeout(function()
            {
                PoemTitleContainer.classList.add("poemFadeElement");
                setTimeout(function() {
                    PoemTitleContainer.style.display='none';
                    PoemBodyContainer.style.display='';
                    PoemBodyContainer.classList.add("poemShowElement");
                    setTimeout(function(){
                        that.InitializePoemBody();
                    }, 2000);
                }, 2000);
            }, 2000);
        }

        /* Add Elements To Display */

        const PoemTitle = document.getElementById("poemTitleContainer");
        const ElementsToFade = PoemTitle.getElementsByClassName("poemFadeElement");
        for(let EntryElement of ElementsToFade)
        {
            this.AddElementToDisplay(EntryElement);
        }
        
        /* Launch Display */

        this.PrintIntervalID = setInterval(function(){ that.DisplayElement(); }, this.TimeMSBetweenCharactersTitle);
    }

    InitializePoemBody()
    {
        const that = this;
        
        /* Poem Header */

        this.OnFinishCallback = function() {            
            const PoemText = document.getElementById("poemTextButton");
            const PoemImage = document.getElementById("poemImageButton");
            PoemText.classList.add("interactuable");
            PoemText.classList.add("poemShowElement");

            PoemText.addEventListener("click", function(){
                if(PoemText.classList.contains("poemShowElement"))
                {
                    PoemImage.classList.add("poemShowElement");
                    PoemText.classList.add("poemFadeElement");
                    PoemText.classList.remove("poemShowElement");
                }
                else
                {
                    PoemImage.classList.remove("poemShowElement");
                    PoemText.classList.remove("poemFadeElement");
                    PoemText.classList.add("poemShowElement");
                }
            });
        }

        /* Add Elements to Display */

        const PoemBodyContainer = document.getElementById("poemBodyContainer");
        const ElementsToFade = PoemBodyContainer.getElementsByClassName("poemFadeElement");
        for(let EntryElement of ElementsToFade)
        {
            this.AddElementToDisplay(EntryElement);
        }

        /* Launch Display */

        this.PrintIntervalID = setInterval(function(){ that.DisplayElement(); }, this.TimeMSBetweenCharacters);
    }

    /* Add elements to display */

    AddElementToDisplay(EntryElement)
    {
        this.ElementsToDisplay.push(EntryElement);
        for(let Element of EntryElement.children)
        {
            this.ElementsToDisplay.push(Element);
        }
    }
    
    DisplayElement()
    {
        const CurrentElement = this.ElementsToDisplay.shift();
        CurrentElement.classList.remove("poemFadeElement");
        const FinishedMessages = this.ElementsToDisplay.length === 0;
        if(FinishedMessages)
        {
            clearInterval(this.PrintIntervalID);
            this.PrintIntervalID = -1;

            if(this.OnFinishCallback !== undefined)
            {
                this.OnFinishCallback();
            }
        }
    }
};

/* Create landpage controller and init once window is loaded. */

let LandpageInstance = new LandpageController();
window.addEventListener("load", (event) => {
    LandpageInstance.Init();
});