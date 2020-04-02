PennController.ResetPrefix(null);
PennController.DebugOff()
PennController.SetCounter("Counter")
PennController.Sequence("DeviceCheck", "Counter", "Subject", "Welcome", "Consent", "trials", "QuestionnairePage", "DebriefingPage", "Send", "Closing")



// Check for L1
PennController("DeviceCheck",
    newText("Device", "<br><br>Are you doing this experiment on a web browser on a computer or laptop (not on a phone, iPad, etc.)?<br><br>")
        .print()
    ,
    newButton("yesPC", "Yes")
    ,
    newButton("noPC", "No")
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
            newText("<br><br>Unfortunately, this experiment only works on a computer. Please close the experiment and come back on a computer or laptop. <br><br>")
                .print()
            ,
            newKey("SPACE")
            .wait()
        )         
)

// Subject info
   PennController("Subject",
    defaultText
        .print()
    ,
    newText("<p>For your participation, you can win a &pound;100 voucher for Amazon (or another webstore, in case you prefer that). Therefore, please leave your email adress in the text field below. so we can contact you in case you won the voucher.  We will not use this emailaddress for any other purposes.</p>")
    ,
    newTextInput("Email")
        .print()
    ,
    newTextInput("Subject", randomnumber = Math.floor(Math.random()*1000000))             
    ,
    newButton("Start")
        .print()
        .wait()
    ,
    newVar("Subject")
        .settings.global()
        .set( getTextInput("Subject") )
    ,
    newVar("Email")
        .settings.global()
        .set( getTextInput("Email") )
    )
    .log( "Subject" , getVar("Subject") )
    .log( "Email" , getVar("Email") )


// Welcome
// Instructions
    PennController("Welcome",
        newText("WelcomeText", "<p>Hello and thank you for participating in this study! </p><p> </p><p> This experiment is a monolingual experiment in English. For this experiment, it is important that you are a native speaker of English. You will be asked to match a picture with a sentence. <b> Please read each sentence carefully, before you select the the picture. </b> If you believe that multiple pictures can be matched to the sentence, please choose your spontaneous preference. After this task, you will be asked to give some information on your language background. </p><p> </p><p> In this study, I investigate several aspects of monolingual and bilingual language processing. This study explores the language processing of Estonian-English and Dutch-English bilinguals and compares this with monolingual language processing. If you would like more details about the findings of this experiment, please send me an email on mieke.slim@ugent.be, and I will send you a report of the findings  Please take part in this experiment on a web browser, not on a tablet or a mobile phone. Note that taking part in this experiment is entirely voluntary and refusal or withdrawal will involve no penalty or loss, now or in the future. </p><p> </p><p> </p><p> </p><p> I (Mieke Slim) can be contacted via mieke.slim@ugent.be if there is anything that is not clear or if you would like more information. Take time to decide whether or not you wish to take part.</p><p> </p><p> Your answers are stored anonymously, and personal details can only be accessed by me (Mieke Slim). The results disseminated at academic journals and conferences. Results are  presented in terms of groups of individuals. If any individual data are presented, the data will be completely anonymous, without any means of identifying the individuals involved. </p><p> </p><p> The project has received ethical approval from the Research Ethics Committee of the Faculty of Modern and Medieval Languages at the University of Cambridge.</p><p> </p><p> I you have any questions, please email me on mieke.slim@ugent.be</p><p> <br> <b> Sometimes, a screen that says that the survey is loading may appear. If this happens, please wait for a couple of seconds. This never takes long. </b> ")
        ,
        newCanvas( "myCanvas", 500, 800)
            .settings.add(0,0, getText("WelcomeText"))
            .print()
        ,
        newButton("finish", "Continue")
            .print()
            .wait()  
     )
    
// Consent
    PennController("Consent",
        newText("ConsentText", "<p> <b> Please read the following carefully! </b> </p><p>I understand that my participation is voluntary and that I am free to withdraw at any time, without giving any reason, and without my rights being affected. </p><p> I understand that any data that are collected will be used and stored anonymously, in accordance with the Data Protection Act. Results are normally presented in terms of groups of individuals. If any individual data were presented, the data would be completely anonymous, without any means of identifying the individuals involved. </p><p> I understand that these data may be used in analyses, publications, and conference presentations by researchers at the University of Cambridge and their collaborators at other research institutions. I give permission for these individuals to have access to these data.</p>")
        ,
        newCanvas( "myCanvas", 300, 600)
            .settings.add(0,0, getText("ConsentText"))
            .print()
        ,
        newButton("I have read an approved the information on this page, continue")
            .settings.center()
            .print()
            .wait()    
        )


// Implementing the Trials
    PennController.Template("trials.csv",
        variable => PennController("trials", 
            newText("sentence", variable.Sentence)
                .settings.center()
                .settings.css("font-size", "30px")
                .settings.bold()
                .print()
            ,
            newImage("picture1", variable.Picture1)
                .settings.size(350,350)
                .settings.css( "border" , "solid 1px black" )
            ,
            newImage("picture2", variable.Picture2)
                .settings.size(350,350)
                .settings.css( "border" , "solid 1px black" )                                   
            ,
            newCanvas(1000,600)
                .settings.center()
                .settings.add(50   , 100,   getImage("picture1"))
                .settings.add(550   , 100,   getImage("picture2"))
                .print()
            ,
            newSelector()
                .settings.add( getImage("picture1") , getImage("picture2") )
//                .shuffle()
                .settings.log()
                .wait()
        )
    .log( "Subject"         , getVar("Subject")         )     
    .log( "Group"           , variable.Group            )
    .log( "StimulusType"    , variable.Stimuli_Type     )                            
    .log( "Sentence"        , variable.Sentence         )
    .log( "Item"            , variable.Item             )
    .log( "Picture1"        , variable.Picture1         )                           
    .log( "Experiment"      , variable.CorPic           ) 
    .log( "Picture2"        , variable.Picture2         )
    .log( "PrimeCondition"  , variable.PrimeCondition   )   
    .log( "Email" , getVar("Email") )                            
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
        newText("Explanation", "Dear participant, <br><br> Thank you for your participation! <br><br> In this study, we test and compare monolingual and bilingual language processing. Some of the sentences you read were ambiguous, such as <i> All the apples are not in the boxes </i>. This sentence can be interpreted as meaning that none of the apples are in the boxes, but also that not all (but some) apples are in the boxes. In this experiment, we wanted to test whether preceding exposure to pictures showing one of the two situations would influence your choice of interpretation of these sentences. <br><br> Do you want to know more, or receive a report of the results? Please email me on mieke.slim@ugent.be <br><br> You can now exit the experiment by closing the browser.")
        ,
        newCanvas("Canvas", 500, 600)
            .settings.add(0,0, getText("Explanation"))
            .print()
        ,
        newButton("void")
            .wait()
     )
