# MeloMood

This is a music journaling application that allows users to journal by selecting a track and then reflecting on it. 
The main components of the application are as follows:
- Creating a New Entry
- Viewing Past Entries
- Creating a Profile

The user is also able to log in and authenticate by using an email and password of their choice. The email/password authentication works
and is implemented through Firebase.

# Link to Recording:
https://washington.zoom.us/rec/play/puVf1Gbm31Ou9wy795v1uKjsvOkB7Eagb7TnXPM__7VK-rs-nHqAihPiNrttVZ5mfSjunQ6PDywdPoOv.Y-yidiXYratuqA7Y?eagerLoadZvaPages=sidemenu.billing.plan_management&accessLevel=meeting&canPlayFromShare=true&from=my_recording&startTime=1748318983000&componentName=rec-play&originRequestUrl=https%3A%2F%2Fwashington.zoom.us%2Frec%2Fshare%2FUeDhu2nshKNEzD3Ur4-_1oBDYbQD-aPY6_robKOBYTmF7gJVWZ-vjmrD8Cs8qveR.pawmhNatwI-p93sU%3FstartTime%3D1748318983000



# Progress
So far, the application is relatively functional, but the overall UI still needs more improvement. 
The Spotify API is the last major part that needs to be integrated so that the user can listen to a track of their choice
while journaling. In addition, the Profile page is not quite organized yet and is still missing some features, such as uploading a photo
or selecting an avatar of choice. 

# Detailed Summary of Progress:
So far, I have successfully set up the overall scaffolding of the web application. I have also successfully connected Firebase and Github to my project. In terms of React components, I have implemented 6 different components, which include an authenticating component, an entry list, a journal entry component, the navigation bar, a prompt component, and a track selector. I have also added four different pages, which include the Home Page, the New Entry Page, the Past Entries page, and a Profile page. 

Some challenges I've encountered were connecting Firebase to application, repeatedly debugging via the console, and understanding how the different React components are implemented. However, after consulting the topics and resources discussed in class, I was able to successfully connect Firebase to my project. I mentioned this in my video presentation, but debugging with the console helped me immensely with my project, as I was able to understand why some components of my project weren't working. Implementing the different React components was a bit tricky at first, but after I referenced the debugging scavenger assignment and watched YouTube videos, I was able to better understand how I would implement specific hooks into my project. 

In terms of functionality of the application, I would say that I am off to a great start. Essentially, most of the features in the app work as needed, besides the Spotify API integration and the profile page for the user. The overall structure for selecting a track and logging in a journal entry works, but I still need to integrate the Spotify API so that the user can listen to a song while journaling. I also need to structure the UI for the profile page in a more organized manner, as it's very cluttered right now. I also want to improve the overall UI of the application too, since it seems a bit bland right now. If I have the time, I'd like to also implement a data analytics page or even structure the home page to appear as a dashboard. 

Overall, I have made concrete progress on this project, but there is certainly room for improvement.


# Current Takeaways
1. **Takeaway #1**
    1. Challenge: Setting up the scaffolding of the project was a bit challenging, but doing it from scratch really helped me with learning
    2. Solution: Understanding the scaffolding of the files in the debugging scavenger hunt helped me. That in-class activity was also valuable in helping me understanding how everything comes together.
2. **Takeaway #2**
    1. Challenge: For a long time, I was encountering a blank page when running the [localhost](http://localhost) page. 
    2. Solution: I didn't realize that all I had to do was save the file. That could have saved me about an hour of debugging. 
3. **Takeaway #3:** 
    1. Challenge: There were instances where only some pages of the web application would display, but other parts didn't work.
    2. Solution: Debugging in the console helped me so much! I was able to better understand why some parts were working and why some parts didn't.
4. **Takeaway #4:**
    1. Challenge: Understanding React components was a bit confusing at first, since this is my first time implementing React.
    2. Solution: Learning by doing was the best way to go. I learn best by just trying things out myself and also reading online articles too.