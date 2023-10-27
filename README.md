# **</Syntax Sorcerers>**

This readme.md file outlines the team details and our contributions the evaluation criteria for a 3D game project.

# Team Details and Contributions

Name, Surname and Student Number: Contribution Split:
Mu'aaz Bassa (2435368) 16.67%
Hamdullah Dadabhoy (2441030) 16.67%
Sayfullah Jumoorty (2430888) 16.67%
Muhammed Muaaz Dawood (2425639) 16.67%
Altaaf Ally (2424551) 16.67%
Mujammil Sakhidas (2436109) 16.67%

We split the Level up and 2 people were assigned per level for the main split
<br>

**Level 1**
Mu'aaz + Mujammil

**Level 2**
Hamdullah + Altaaf

**Level 3**
Sayfullah + Muhammed

In terms of other splits we did it on a case by case baisis for exmaple here is some memorable work

- MiniMap: Mu'aaz
- Ship Explosion and Boost: Sayfullah
- In Game Menu: Mujammil
- Main Menu: Altaaf
- Asteriods: Muhammed
- 1st Person View of Spaceship: Hamdullah

# Game Evaluation Criteria

These criteria are used to assess different aspects of the game, including viewing, control, playability, 3D effects, coding style, design style, polish, and innovation. Each criterion is associated with a percentage weight that contributes to the final grade.

**Viewing (10%)**

Loading 3D Scene: Does the game successfully initialize and load a 3D scene?

- Affirmative.

Scene Animation: Is dynamic animation present within the 3D environment?

- Indeed, animation is evident through the movement of asteroids and the rotation of planets around the sun.

User View Control: Can players manipulate their perspective in-game?

- Absolutely, users have the option to switch between first-person and third-person views, using the p key we can change the views.

Camera Movement: Is there any capability for camera movement within the game world?

- Yes, we have one camera attached to a moving spaceship and another camera used as a minimap of the scene.

Animation Glitches: Are there any observable animation irregularities?

- Notably, there are no noticeable glitches, though there might be a minor issue with the asteroids' animation.

3D Avatars: Are 3D avatars featured for main characters or other elements in the game?

- Certainly, every element in the game, from spaceships to planets and even the sun, is represented in 3D.

Moving Objects: Do objects move in conjunction with the world, and are there items that follow the camera's movement?

- Objects such as planets and asteroids move with the world, while items like the collection counter and time counter are linked to the spaceship and move with the camera.

Multiple Views: Does the game offer various viewing perspectives, such as first-person, third-person, or a minimap?

- Users can seamlessly switch between first-person and third-person views.

Picture-in-Picture: Is there a picture-in-picture feature?

- Yes, the bottom-right minimap provides this functionality.

**Control (10%)**

Keyboard and Mouse Controls: Are keyboard and mouse controls integrated, and do they offer smooth gameplay?

- Players navigate the spaceship using WASD controls, which provide a seamless experience.

Control Logic: Are the controls intuitively designed and aligned with the game's mechanics?

- Yes the controls are intuitively designed and aligned with the game's mechanics as it is a flying game where you use WASD to move around, shift to boost and p to change views

Effective Control: Do the controls effectively govern scene manipulation, viewpoint adjustments, and avatar interactions as required?

- Yes, the spaceship can interact and move about the scene using the keys and the world interacts/changes based on the spaceships position

**Playability (10%)**

Objective: Does the game entail clear objectives, such as item collection or specific tasks?

- Each level features objectives communicated by the commander.

Success and Failure: Can players achieve success or fail to meet the game's objectives?

- Certainly, success or failure prompts a pop-up notification.

Competitive and Fun: Is the game competitive and enjoyable?

- There is a leaderboard on each level that shows how other players did in that level. The game is fun to play, and the leaderboard adds a competitive element.

3D Gameplay: Does the game effectively utilize all three dimensions, with controls appropriately responsive?

- Yes it does, you can move, up down left and right in terms of the planets and asteriods they do move in three dimensions as they are moving around and rotating.

Physics Model: Does the game incorporate a functioning physics model, including collision and explosion mechanics?

- Collisions with non-objective items result in spaceship explosions and accompanying animations.

**3D Effects (15%)**

Graphical and 3D Effects: Does the game showcase various graphical and 3D effects such as anti-aliasing, depth tests, color utilization, multiple light sources, shading techniques, curves, surfaces, skyboxes, shadows, reflections, and refractions?

- Yes it does, the game has depth tests as the objects appear smaller when far and bigger when closer. The astronauts have a shade of blue overlay on them In terms of shadows the objects have different shades based if the light source is blocked or not. The light bounces off the spaceship to show reflection.

Creative Use of Effects: Are these effects employed creatively and in an aesthetically pleasing manner?

- Yes the game looks complete and aesthetically pleasing with no flaws in the overrall design/view of the game

**Coding Style (10%)**

Best Coding Practices: Is the code adhering to best coding practices, including meaningful variable, function, object, and file naming?
Yes, all code is in functions which allow reuse. We have meaningful names for the varaibles and functions and all them are in use effectivly. The file names are correclty named with its purpose or reason as to what they do.

Indentation and Comments: Is the code correctly indented and sufficiently documented?

- Yes, the code is formatted and Indented correctly we also have enough comments throughout the files.

Documentation: Is the code well-documented, offering insight into its functionality?

- Yes, we have enough comments to understand what each part of our program is doing

Version Control: Is the code version-controlled using Git or a comparable system?
Yes, we have used Git/Github to do version-control. It helped us track different versions of our code and collaborate with each otehr. Since we were working on the project for a while, it helped us keep track of which chnages were made, by whom and when those changes were made.

Object-Oriented Programming: Is Object-Oriented Programming appropriately employed where relevant?

- Yes, we have employed OOP into our game, we have different files

**Design Style (25%)**

Hierarchical Modeling: Assess the quality of hierarchical modeling and the rationale behind the design approach.

- Hierarchical modeling can be seen when add effects to the space ship such a flame is created which is added to the space ship. All the planets are also Hierarchical modeling as each planet in Level 2 rotates around the Sun and some planets like Earth has a moon which rotatesa round the earth.

Modeling Explanation: Elaborate on how the world, objects, and sub-objects were modeled and the reasoning behind these choices.

- All the objects were modeled based off the space theme of our game.
- Our main environment used is just a big sphere with
- We used a lot of free models from sketchfab.com which are licensed under C-BY-4.0 and all credit for the used models are on our Credits page.
  //TODO: Add more detail here

Advantages and Disadvantages: Discuss the strengths and weaknesses of the chosen design approach.

**Polish (10%)**

Game Quality: Evaluate the overall aesthetics and user experience.

- In terms of Graphics and Visuals, all our objects and well detailed, seem realistic and are visually appealing. The style of these fit the space theme we are going for.
  We have sound for each level as well which gives intructions to each level as well as music.
- The UI also has a certain theme and is easy to use. We have a storyline in a sense as well.
- The game is overall visually appealing and sticks to a theme besides being easy to use and play.

Restart Feature: Can the game be restarted without needing a page refresh?

- Using the in-game pause menu, users can restart the game without refreshing the page. By clicking the "esc" key and clicking restart.The game also can be restarted when you die.

Performance: Does the game exhibit lag or performance issues?

- The game does not lag nor does it have any performance issues.

Dashboard/Menu: Is there an in-game dashboard or menu for user convenience?

- The escape button is used to pause the game and the user can restart the game from the pause menu.

Color Scheme: Is there a consistent and visually pleasing color scheme throughout the game?

- Yes there is a specific colour scheme and theme throughout the game, it is visually pleasing as well.

Extra Features: Are there supplementary features or enhancements that elevate the gameplay?

- We added a social feature to the game where after every time you play you are given a score which is stored in a Firebase database and the top 5 of each level is displayed.

**Innovation (10%)**

New Ideas: Evaluate the presence of innovative concepts within the game.

- Each level has a purpose and isn't meaningless.
- We have a unique yet reaslitic design for all the objects.
- You can also use a controller in the game.
- We added a leaderboard with the top 5 scores, and if someone decides to decrease your score they can't as if you have the same name then the higher score is taken.

Unique Elements: Assess whether the game explores novel ideas, employs custom models and textures, incorporates unconventional effects or techniques, introduces networking or multiplayer elements, and utilizes sound, efficiency, speed, or other distinctive aspects.

- We have implemented a cutom model/explosion when the you crash. The Ship explodes.
- We have a multiplayer aspects where we have a leaderboard and you enter your score after completing a level or dieing.
- Our game loads noticeable faster than other games, which we have tested.
- We have a song that plays as well.
- Our game also runs at a solid frame rate so it is very much playable.

Memorability: Determine if the game possesses unique qualities that make it memorable and distinguish it from others.

- There is story line to our game
- We have sound of a space commander giving you the intructions to the levels.
- We have implmented a Solar System, Death Star and other Space Themes.

Controller Compatibility: Consider whether controller compatibility has been integrated.

- Controller functionality has been implemented.

Blender Usage: Take into account the utilization of Blender for modeling and texturing.

- Each and every model in the game has been created using Blender. As well as notably the Spaceship explosion when you die was done in Blender as well, Sayfullah broke the spaceship into smaller segments and made it expand out when you die.

Explosions: Evaluate the implementation of explosive elements within the game.

- Explosions are implemented when the spaceship collides with an asteroid and when the spaceship collides with a non-objective item such as black holes, planets and the sun.
