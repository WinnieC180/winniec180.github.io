import earring from "../assets/inventory/earring.png";
import laptop from "../assets/inventory/laptop.png";
import headphones from "../assets/inventory/headphones.png";
import bottle from "../assets/inventory/bottle.png";
import key from "../assets/inventory/key.png";
import fannypack from "../assets/inventory/fannypack.png";
import seaweed from "../assets/inventory/seaweed.png";
import sunscreen from "../assets/inventory/sunscreen.png";

import life1 from "../assets/about/life-1.jpg";
import life2 from "../assets/about/life-2.png";
import life3 from "../assets/about/life-3.jpg";
import life4 from "../assets/about/life-4.png";
import life5 from "../assets/about/life-5.jpg";
import life6 from "../assets/about/life-6.jpg";
import life7 from "../assets/about/life-7.jpg";
import life8 from "../assets/about/life-8.jpg";

// Inventory Log: icon, title, typed notes, three stats (0-100)
// Optional: rot (rotation), slotScale (size in slot grid only), float: "vertical" (no side swing)
export const INVENTORY = [
  { icon: earring, slotScale: 0.8, displayScale: 0.8, displayY: -20, title: "Bone Appétit Earring", notes: ["One of my favorite earrings :)", "Collection from Freddie Chen x STUDIOCULT"], stats: [["Wearability", 100], ["Aesthetic", 90], ["Daily Usage", 80]] },
  { icon: laptop, rot: "-90deg", slotScale: 0.85, float: "vertical",  displayY: -10, title: "Laptop", notes: ["Must need everywhere", "It collects stickers from my journey along the way"], stats: [["Battery Life", 50], ["Importance", 100], ["Sticker Coverage", 80]] },
  { icon: headphones, slotScale: 0.85, displayScale: 0.8,  displayY: -10, title: "Headphones", notes: ["Focus mode: on", "Listening to StrayKids or ATEEZ"], stats: [["Noise Cancelling", 85], ["Comfort", 75], ["Playlist", 100]] },
  { icon: bottle, title: "Water Bottle", notes: ["Hydration is important!!!", "Survived many dents :("], stats: [["Hydration", 100], ["Dents", 70], ["Durability", 95]] },
  { icon: key, rot: "10deg",  displayY: -20, title: "Keys", notes: ["Small but very important", "Jingles all the wayy"], stats: [["Importance", 100], ["Times Misplaced", 55], ["Jingle Factor", 70]] },
  { icon: fannypack, title: "Fanny Pack", notes: ["Hands-free everything", "Fits more than you would expect"], stats: [["Storage", 80], ["Convenience", 100], ["Style", 85]] },
  { icon: seaweed, title: "Seaweed Snack", notes: ["Go-to study fuel", "I eat too much at once"], stats: [["Crunch", 90], ["Saltiness", 70], ["Yummyness", 100]] },
  { icon: sunscreen,  displayY: -20, title: "Sunscreen", notes: ["Need to remind myself to always bring it", "Reapply, reapply, reapply"], stats: [["Protection", 100], ["Importance", 100], ["Daily Usage", 95]] },
];

export const PHOTOS = [
  { src: life1, x: 264, y: 14, w: 288, h: 187, rot: -2, title: "Teaching at summer camp", caption: "I taught a STEM class! We made ice cream from scratch (and also buying some back up cookies and cream ice cream to enjoy afterwards)." },
  { src: life2, x: 604, y: 74, w: 310, h: 186, rot: 1.5, title: "Newbie Social", caption: "Ate amazing food cooked by our design leads welcoming us to the design team on DTI." },
  { src: life3, x: 966, y: 24, w: 246, h: 187, rot: 2, title: "Roaming around", caption: "Hanging out with my friend around Manhattan, yapping away before heading back to school. " },
  { src: life4, x: 204, y: 279, w: 322, h: 213, rot: -1.5, title: "Cornell DTI", caption: "Full team photo of the Digital Tech & Innovation project team!" },
  { src: life5, x: 966, y: 294, w: 254, h: 190, rot: 1.5, title: "Buttons", caption: "My first big snow day in college, made a snowman with my friends right after taking an exam at night!" },
  { src: life6, x: 284, y: 569, w: 193, h: 263, rot: -2, title: "Graduation??", caption: "My youngest brother graduated!!! Fun fact: He's holding a bouquet I finished corcheting the night before" },
  { src: life7, x: 509, y: 579, w: 194, h: 151, rot: 2, title: "Tostadas", caption: "Nom nom" },
  { src: life8, x: 744, y: 584, w: 351, h: 192, rot: -1, title: "Friends", caption: "We played in the snow right after taking this photo. We made an indent in the 5 inch snow for this photo heh. " },
];
