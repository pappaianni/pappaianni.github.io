class LandpageController
{
    TimeMSBetweenCharactersTitle = 200;
    TimeMSBetweenCharacters = 60;
    PrintIntervalID = -1;
    ElementsToDisplay = [];
    OnFinishCallback = undefined;

    /* Main Logo Var Times */

    TimeToFadeInShowFace = 100;
    TimeToFadeInShowGlobe = 1000;
    TimeToFadeInLogo = 2000;
    TimeToMakeLogoInteractuable = 1000;
    TimeToFadeOutMainLogo = 3000;

    /* Language Picker Var Times */

    TimeToStartDisplayLang = 100;
    TimeToMakeLangInteractive = 1000;

    TimeToStartShowingPoemHeader = 1000;
    TimeToKeepTitleOnDisplay = 2000;
    TimeToStartShowingPoemBody = 1000;

    /* Initialization Methods */

    Init()
    {
        this.InitializeElements();
        this.InitializeLanding();
    }

    /* Landing */

    InitializeLanding()
    {
        const that = this;
        const MainLogoTitle = document.getElementById("mainLogoTitle");
        const MainLogoGlobe = document.getElementById("mainLogoGloboImage");
        const MainLogoFace = document.getElementById("mainLogoFaceImage");

        setTimeout(function(){  MainLogoFace.classList.remove("elementNoOpacity"); }, that.TimeToFadeInShowFace);
        setTimeout(function(){  MainLogoGlobe.classList.remove("elementNoOpacity"); }, that.TimeToFadeInShowGlobe);
        setTimeout(function(){  MainLogoTitle.classList.remove("elementNoOpacity"); }, that.TimeToFadeInLogo);

        setTimeout(function() {
                MainLogoTitle.classList.add("interactuable");
                MainLogoTitle.addEventListener("click", function(){
                    MainLogoTitle.classList.remove("interactuable");
                    that.HideLanding();
                });
            }, (that.TimeToFadeInLogo + that.TimeToMakeLogoInteractuable) );
    }

    HideLanding()
    {
        const that = this;
        const MainLandpage = document.getElementById("mainLandpage");
        MainLandpage.classList.add("elementNoOpacity");
        setTimeout(function(){
            MainLandpage.classList.add("turnOffDisplay");
            that.InitializeLanguagePicker();
        }, that.TimeToFadeOutMainLogo);
    }

    /* Language Picker */

    InitializeLanguagePicker()
    {
        const that = this;
        const LanguagePickerContainer = document.getElementById("languagePickerContainer");
        const LanguagePicker = document.getElementById("languagePicker");

        // Display container.
        LanguagePickerContainer.classList.remove("turnOffDisplay");
        setTimeout(function(){  LanguagePicker.classList.remove("elementNoOpacity"); }, this.TimeToStartDisplayLang);

        // Setup languages.
        setTimeout(function(){ 
            const LanguagePickerElements = document.getElementById("languagePicker");
            for(let LanguageElement of LanguagePickerElements.children) {
                LanguageElement.classList.add("interactuable");
                LanguageElement.addEventListener("click", function(){
                    LanguageElement.classList.remove("interactuable");
                    that.ConfigurePageLanguage(LanguageElement.dataset.lng);
                });
            }
        }, this.TimeToMakeLangInteractive);
    }

    ConfigurePageLanguage(LanguageToUse){
        console.log(LanguageToUse);
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
        const MainLandpage = document.getElementById("mainLandpage");
        const BodyContainer = document.getElementById("bodyContainer");
        const PoemContainerID = document.getElementById("poemContainerID");

        // Fade logo landpage.
        MainLandpage.classList.add("elementNoOpacity");

        /* Setup intersection observer. */

        const ObserverOptions = {
            root: null,
            threshold: 0,
            rootMargin: '0px 0px -200px 0px'
        };
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, ObserverOptions);

        let fadeSections = Array.from(document.getElementsByClassName('anim-fade-in-section'));
        fadeSections = fadeSections.concat(Array.from(document.getElementsByClassName('anim-slow-fade-in-section')));
        fadeSections = fadeSections.concat(Array.from(document.getElementsByClassName('anim-fade-in-section-no-transform')));
        fadeSections = fadeSections.concat(Array.from(document.getElementsByClassName('anim-fade-in-cleo')));
        for (let section of fadeSections) {
            observer.observe(section);
        }

        /* Showcase body. */

        setTimeout(function(){
            MainLandpage.style.display = "none";
            BodyContainer.style.display = "";
            setTimeout(function()
            {
                PoemContainerID.classList.add("elementFullOpacity");
                that.InitializePoemHeader();
            }, that.TimeToStartShowingPoemHeader);
        }, that.TimeToFadeOutMainLogo);
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

/* Create landpage controller and init once window is loaded. */

let LandpageInstance = new LandpageController();
window.addEventListener("DOMContentLoaded", (event) => {
    LandpageInstance.Init();
});