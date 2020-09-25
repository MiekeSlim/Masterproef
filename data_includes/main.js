// Masterproef

PennController.ResetPrefix(null) // Shorten command names (keep this line here)
//PennController.DebugOff()
PennController.SetCounter("Counter")
PennController.CheckPreloaded().label("Preload")
PennController.Sequence("DeviceCheck+Subject", "Counter", "Welcome", "Consent", "Preload", "trials", "QuestionnairePage", "Send", "Closing")

// Check for L1
PennController("DeviceCheck+Subject",
    newText("Device", "<br><br>Doe je dit experiment via een webbrowser op een computer of laptop (niet op een smartphone, tablet etc.)?<br><br>")
        .print()
    ,
    newButton("yesPC", "Ja")
    ,
    newButton("noPC", "Nee")
        .settings.before( getButton("yesPC") )
        .print()
    
    ,
    newSelector("yesnoPC")
        .settings.add( getButton("yesPC") , getButton("noPC"))
        .wait()
    ,
    getSelector("yesnoPC")
        .settings.log()
        .test.selected(getButton("yesPC") )
        .failure(
            newText("<br><br>Helaas werkt dit experiment alleen op een computer. Gelieve het experiment af te sluiten en herop te starten op een computer of laptop. <br><br>")
                .print()
            ,
            newKey("SPACE")
            .wait()
            
    ,    
    newTextInput("Subject", randomnumber = Math.floor(Math.random()*1000000)) 
    
    ,
    newVar("Subject")
        .settings.global()
        .set( getTextInput("Subject") )
    
    )
    //.log( "Subject" , getVar("Subject") )        
            
)         

// Welcome, consent, and creditstuff
// Instructions
    PennController("Welcome",
        newText("WelcomeText", "<p>Hallo en bedankt om deel te nemen aan deze studie! </p><p> </p><p>Vooraleer je besluit om deel te nemen aan deze studie, is het belangrijk om te snappen waarom dit onderzoek wordt uitgevoerd en wat het zal inhouden. Neem de tijd om onderstaande uitleg aandachtig te lezen. Je kan me (Helene Van Marcke) bereiken via Helene.VanMarcke@UGent.be indien er iets onduidelijk is of je meer informatie wenst. Neem de tijd om te beslissen of je deel wilt nemen of niet. </p><p> </p><p> In deze studie onderzoek ik aspecten van tweetalige taalverwerking in het kader van mijn masterproef. Indien je meer details zou wensen over de uiteindelijke resultaten van het onderzoek, kan je een e-mail sturen naar Helene.VanMarcke@UGent.be. </p><p> </p><p> Dit experiment is een tweetalig experiment in Nederlands en Engels. Het is belangrijk dat je moedertaal Nederlands is en je kennis van Engels hebt. In het experiment zal je telkens een zin lezen, gevolgd door twee plaatjes. <b> Jouw taak is om te klikken op het plaatje dat de gebeurtenis uit de zin correct weergeeft. Gelieve elke zin aandachtig te lezen vooraleer je een plaatje kiest. </b> Sommige zinnen zullen in het Nederlands zijn, sommige in het Engels. Indien je denkt dat beide plaatjes bij de zin kunnen passen, kies dan je spontane voorkeur. Na de taak zal je gevraagd worden enkele vragen over je taalachtergrond te beantwoorden. </p><p> </p><p> Gelieve dit experiment af te leggen op een webbrowser, niet via een tablet of smartphone. Niet deelnemen aan dit experiment is geheel vrijwillig. Het weigeren of stopzetten van je deelname zal op geen enkel moment een straf of verlies inhouden. </p><p> </p><p> Alle antwoorden worden anoniem opgeslagen en alleen ik (Helene Van Marcke) heb toegang tot persoonlijke gegevens. De resultaten van de studie zullen worden weergegeven op groepsniveau. Indien individuele data toch gepresenteerd wordt, gebeurt dit geheel anoniem en zonder mogelijkheid om het individu te traceren. </p><p> </p><p> Bij vragen, gelieve een mail te sturen naar Helene.VanMarcke@UGent.be</p><p> <br> <b>Het kan gebeuren dat er een scherm verschijnt waarop staat dat de survey aan het laden is. Gelieve gewoon te wachten wanneer dit gebeurt tot wanneer het experiment weer verdergaat. Dit duurt nooit lang. </b> ") 
        ,
        newCanvas( "myCanvas", 500, 800)
            .settings.add(0,0, getText("WelcomeText"))
            .print()
        ,
        newButton("finish", "Doorgaan")
            .print()
            .wait()  
     )
    
// Consent
    PennController("Consent",
        newText("ConsentText", "<p> <b> Gelieve onderstaande tekst aandachtig te lezen! </b> </p><p> Ik snap dat mijn deelname vrijwillig is en ik mijn deelname op ieder moment mag stopzetten zonder een reden te moeten opgeven en zonder dat mijn rechten hierdoor aangetast worden. </p><p> Ik snap dat alle data die verzameld wordt anoniem zal worden gebruikt en opgeslagen, in overeenstemming met de Algemene Verordening Gegevensbescherming (GDPR). Resultaten worden normaal gezien weergegeven op groepsniveau. Indien individuele data toch gepresenteerd wordt, gebeurt dit volledig anoniem en zonder de mogelijkheid om het individu in kwestie te traceren. </p>")
        ,
        newCanvas( "myCanvas", 300, 600)
            .settings.add(0,0, getText("ConsentText"))
            .print()
        ,
        newButton("Ik heb de informatie op deze pagina gelezen en goedgekeurd, doorgaan")
            .settings.center()
            .print()
            .wait()    
        )
   
// Implementing the Trials
    PennController.Template("Trials_MP.csv",
        variable => PennController("trials", 
            newText("sentence", variable.Sentence)
                .settings.center()
                .settings.css("font-size", "30px")
                .settings.bold()
                .print()
            ,
            newImage("Picture1", variable.IncorOrHA)
                .settings.size(350,350)
                .settings.css( "border" , "solid 1px black" )
            ,
            newImage("Picture2", variable.CorrOrLA)
                .settings.size(350,350)
                .settings.css( "border" , "solid 1px black" )                                   
            ,
            newCanvas(1000,600)
                .settings.center()
                .settings.add(50   , 100,   getImage("Picture1"))
                .settings.add(550   , 100,   getImage("Picture2"))
                .print()
            ,
            newSelector()
                .settings.add( getImage("Picture1") , getImage("Picture2") )
                .shuffle()
                .settings.log()
                .wait()
    )  
    .log( "Subject"         , getVar("Subject")         )
    .log( "Group"           , variable.Group            ) 
    .log( "Trials"          , variable.Trials           )
    .log( "Item"            , variable.Item             )
    .log( "StimulusType"    , variable.Stimulus_type    )                          
    .log( "PrimeCondition"  , variable.Prime_condition  )  
    .log( "Sentence"        , variable.Sentence         )
    .log( "Picture1"        , variable.IncorOrHA        )                          
    .log( "Picture2"        , variable.CorrOrLA         )
                                  
)

// Vragen gegevens:
PennController("QuestionnairePage",
    newHtml("Questionnaire", "Questionnaire.html")
        .settings.log()
        .print()
    ,
    newButton("continue", "Continue")
        .print()
        .wait(
            getHtml("Questionnaire").test.complete()
                .failure( getHtml("Questionnaire").warn() )
        )                      
)
.log( "Subject", getVar("Subject")) 


PennController.SendResults("Send");

PennController("Closing",
    newText("Explanation", "Bedankt voor je deelname! <br><br> Wil je meer weten over het experiment of de resultaten? Stuur dan een mail naar Helene.VanMarcke@UGent.be <br><br> Je kan het experiment gewoon verlaten door je browser te sluiten.")
    ,
    newCanvas("Canvas", 500, 600)
        .settings.add(0,0, getText("Explanation"))
        .print()
    ,
    newButton("void")
        .wait()
)
