class MainPageController
{
    TimeMSBetweenCharactersTitle = 200;
    TimeMSBetweenCharacters = 60;
    PrintIntervalID = -1;
    ElementsToDisplay = [];
    OnFinishCallback = undefined;

    /* Body */

    TimeBeforeStartWritingText = 500;
    TimeToKeepTitleOnDisplay = 2000;
    TimeToStartShowingPoemBody = 1000;

    /* Initialization Methods */

    Init()
    {
        this.InitializeElements();
        this.InitializeBody();
    }

    /* Body */

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
                TextChar.classList.add("elementNoOpacity");
                TextChar.innerHTML = TextContent[CharIndx];
                Child.append(TextChar);
            }
        }
    }

    InitializeBody()
    {
        const that = this;
        const PoemContainerID = document.getElementById("poemContainerID");

        /* Normal Intersection Observer */

        const NormalObserverOptions = {
            root: null,
            threshold: 0,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const NormalObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    NormalObserver.unobserve(entry.target);
                }
            });
        }, NormalObserverOptions);

        let fadeSections = Array.from(document.getElementsByClassName('anim-fade-in-section'));
        fadeSections = fadeSections.concat(Array.from(document.getElementsByClassName('anim-slow-fade-in-section')));
        fadeSections = fadeSections.concat(Array.from(document.getElementsByClassName('anim-fade-in-section-no-transform')));
        for (let section of fadeSections) {
            NormalObserver.observe(section);
        }

        /* Cleo Intersection Observer */

        const CleoObserverOptions = {
            root: null,
            threshold: 0,
            rootMargin: '0px 0px 600px 0px'
        };
        
        const CleoObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    CleoObserver.unobserve(entry.target);
                }
            });
        }, CleoObserverOptions);

        let fadeCleo = Array.from(document.getElementsByClassName('anim-fade-in-cleo'))
        for (let section of fadeCleo) {
            CleoObserver.observe(section);
        }

        /* Showcase body. */

        PoemContainerID.classList.add("elementFullOpacity");
        setTimeout(function(){ that.InitializePoemHeader(); }, that.TimeBeforeStartWritingText);
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
                PoemTitleContainer.classList.add("elementNoOpacity");
                setTimeout(function() {
                    PoemTitleContainer.style.display='none';
                    PoemBodyContainer.style.display='';
                    PoemBodyContainer.classList.add("elementFullOpacity");
                    that.InitializePoemBody();
                }, that.TimeToStartShowingPoemBody);
            }, that.TimeToKeepTitleOnDisplay);
        }

        /* Add Elements To Display */

        const PoemTitle = document.getElementById("poemTitleContainer");
        const ElementsToFade = PoemTitle.getElementsByClassName("elementNoOpacity");
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
            PoemText.classList.add("elementFullOpacity");

            PoemText.addEventListener("click", function(){
                if(PoemText.classList.contains("elementFullOpacity"))
                {
                    PoemImage.classList.add("elementFullOpacity");
                    PoemText.classList.add("elementNoOpacity");
                    PoemText.classList.remove("elementFullOpacity");
                }
                else
                {
                    PoemImage.classList.remove("elementFullOpacity");
                    PoemText.classList.remove("elementNoOpacity");
                    PoemText.classList.add("elementFullOpacity");
                }
            });
        }

        /* Add Elements to Display */

        const PoemBodyContainer = document.getElementById("poemBodyContainer");
        const ElementsToFade = PoemBodyContainer.getElementsByClassName("elementNoOpacity");
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
        CurrentElement.classList.remove("elementNoOpacity");
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

/* Create controller and init once window is loaded. */

let MainPageInstance = new MainPageController();
window.addEventListener("DOMContentLoaded", (event) => {
    MainPageInstance.Init();
});