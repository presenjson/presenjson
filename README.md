# Presenjson Proof of Concept
This is a proof of concept - please do the right thing and never use this in production. Even if you're cool.
### Coding videos for the web

![](example.gif)
[Go to the live example here](https://example-presenjson.now.sh/)

## TL;DR
With Presenjson you can create interactive and responsive videos and play them on all devices on the web. You control the content of the video by react components and style the video using css.

Think of Presenjson as Adobe Premiere®, where you can put video and audio clips into tracks, maybe add some effects and then probably render it to an .mp4 file at the end. Presenjson basically works the same, except leaves the last step of rendering it to an mp4 file away - the Browser takes over this job and does it on every client. You are defining the 'raw' video with all its assets.

## Motivation
For example - lets say you are trying to build the simplest product to sell a very complicated product - cruises. 

A single cruise has a lot of information  attached to it - the itinerary (which ports when for how long), what the ship has to offer (they are huge, so a lot), what cabins are available and how much they cost. This is a lot of information to get across - especially on mobile. so instead of leaving it up to the cruiser to scroll to death - lets create a short presentation or video that compacts the most useful information into 60 seconds. Now we could always contract an agency to create cute little videos for the top 200 cruises - but if you want to include some volatile information like the current price into it - you will have to keep updating the video with the current price (which can change muliple times a day). Doing this for 15k itenerary combinations just doesn't seem feasable. One way to make this possible is to create a template or skeleton of the video - think of this as a timeline or screenplay of what content is displayed when. In the cruise case - we might decide to spend the first 15 seconds introducing the ship and combine it with the top 3 meaningful user reviews. After that we probably want to give a quick walkthru of the main ports of call followed by the climate of the region. At the end We will show the current price per cabin, or maybe just the price of the selected cabin of interest. Sounds good? Here's the code for the GIF above.


## Example
Here is the code for the most lame example of a flying cat with some text.

```JavaScript
import { Presenjson, Scene, Audio, Track, Clip } from 'presenjson/src/index';
import 'presenjson/src/clip.css';

const Chopper = (props) => (
    <Scene transparent>
        <Audio src='chopper.mp3#t=20' play={props.play} />
        <div id='chopper'>
            <div id='left' />
            <div id='right' />
        </div>
    </Scene>
);

const Background = () => (
    <Scene light>
        <div className='bg' />
    </Scene>
);

const LENGTH = 20000;
const Presentation = () => (
    <PresenJson>
        <Track>
            <Clip length={LENGTH} component={Background} />
        </Track>
        <Track>
            <Clip component={BigText} length={1000} title='THIS' color='#105de0' />
            <Clip component={BigText} length={1000} title='IS' color='#36db94' />
            <Clip component={BigText} length={500} title='NOT' color='#000820' />
            <Clip component={BigText} length={500} title='REALLY' color='#A61D55' />
            <Clip component={BigText} length={500} title='A' color='rgb(0, 132, 137)' />
            <Clip component={BigText} length={10000} title='VIDEO' color='#fb5879' />
        </Track>
        <Track>
            <Clip component={Chopper} length={LENGTH} />
        </Track>
    </PresenJson>
);

export default Presentation;
```

Each Presenjson can have multiple `Track`s which contain multiple `Clip`s. The tracks are played at the same time in paralell, the clips are played in sequence. With the `component` prop of `Clip` you define what component should be rendered.

```JavaScript
/* BigText.js */
const BigText = (props) => 
<Scene transparent>
    <Animated approach>
        <h1 style={{ color: props.color }}>{props.title}</h1>
    </Animated>
</Scene>;
```
Every clip is wrapped in a `Scene`. Inside a scene you can use any normal jsx and JavaScript and access the props that you passed in. The other components like `Animated` and `Style` are just predefined wrappers for certain styles and animations.

### How it works

![Presenjson overview](presenjson.png)

## Components

### PresenJson

The overall component which wraps the tracks and clips.

Props

`poster`: sets the poster - the thing you will see before the video starts. Can be a component or just a url to an image.

`<PresenJson poster='/url/to/image.jpg'> ... </PresenJson>`

`data`: defines the global data of the video that is passed down and accessable to each `Clip` via `props.data`.

### Scene
Everything you want to display shold be inside a `Scene`. this component is just a wrapper that you can configure to either be transparent, black (default) or white

### Video

### Image

### Audio


### Sequences

### Visual effects (vfx)

## Why

## How

## What Presenjson does
Presenjson takes care of the sceduling - meaning that it decides what component to render at what time. It provides basic audiovisual components like `Audio`, `Video` and `Image`.  `Style` and `Animated`


## Roadmap
- Preload assets (Audio/Video buffers)
- Use Audio Context/Nodes
- Use MSE 
- Jump to any position with correct music/video/animation sync
- Render stuff before actually on screen


## 