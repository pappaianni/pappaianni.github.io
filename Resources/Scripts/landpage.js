class LandpageController
{
    /* Main Logo Var Times */

    TimeToFadeInShowFace = 100;
    TimeToFadeInShowGlobe = 1000;
    TimeToFadeInLogo = 2000;
    TimeToMakeLogoInteractuable = 1000;
    TimeToFadeOutMainLogo = 3000;

    /* Language Picker Var Times */

    TimeToStartDisplayLang = 100;
    TimeToMakeLangInteractive = 1000;
    TimeToHideLang = 2000;

    /* Initialization Methods */

    Init()
    {
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
        // Vars
        const that = this;
        const LanguagePickerContainer = document.getElementById("languagePickerContainer");
        const LanguagePicker = document.getElementById("languagePicker");


        // Event when we click a language.
        function OnLanguageClick(LanguageElementClicked) {

            // Remove events on click.
            for(let LanguageElement of LanguagePicker.children) {
                LanguageElement.classList.remove("interactuable");
                LanguageElement.removeEventListener("click", OnLanguageClick);
            }
            
            // Configure page.
            that.ConfigurePageLanguage(LanguageElementClicked.target.dataset.lng);
        }

        // Display container.
        LanguagePickerContainer.classList.remove("turnOffDisplay");
        setTimeout(function(){  LanguagePickerContainer.classList.remove("elementNoOpacity"); }, this.TimeToStartDisplayLang);

        // Setup languages.
        setTimeout(function(){ 
            for(let LanguageElement of LanguagePicker.children) {
                LanguageElement.classList.add("interactuable");
                LanguageElement.addEventListener("click", OnLanguageClick);
            }
        }, this.TimeToMakeLangInteractive);
    }

    ConfigurePageLanguage(LanguageToUse){

        const LanguagePickerContainer = document.getElementById("languagePickerContainer");
        LanguagePickerContainer.classList.add("elementNoOpacity");

        setTimeout(function(){
            // Load the desired page.
            console.log(LanguageToUse);
            window.location.assign("./en/index.html");
        }, this.TimeToHideLang);
    }
};

/* Create landpage controller and init once window is loaded. */

let LandpageInstance = new LandpageController();
window.addEventListener("DOMContentLoaded", (event) => {
    LandpageInstance.Init();
});