---
title: "Forward Kinematic Arm"
pubDate: "2026-06-18"
---

One of the conceptually simplest ways to teach a robot to act intelligently is to have it mimic human input. However, a good "expert" dataset can only be obtained if the human can control the device as if it were an extension of their own body. To eventually teach a robot arm to automate some simple physical tasks, I decided to create this "forward kinematic arm" as a sort of 3D mouse that tracks my movements and generates a training dataset of me doing various tasks.

![An image of the current working prototype](./_assets/forward-kinematic-arm/testing_setup.jpg)

The arm is an unpowered linkage with three potentiometers placed at each location where joints can rotate. There is one in the base, one on the rotating platform/turret, and one placed at the "elbow". When the link lengths are known, trigonometry can be used to compute the position of the arm's tip relative to its base. Then, assigning a coordinate frame to the base allows measurements to be made.

---

## hardware selection

In general, I mostly used cheap and readily available components from Amazon. I used an Arduino Leonardo to interface between my laptop and the sensors. Consulting with my professor, I also learned to pick out some useful hardware like thrust bearings (to support the turret) and MakerBeam extrusions (allowing more rigidity than a fully 3D printed design). Here's a rough parts list:

- [Potentiometers](https://a.co/d/00tr50I6)
- [Thrust bearings](https://a.co/d/07Qh6RBU)
- [Flanged ball bearings](https://a.co/d/0cTVoxgD)
- [T-slot extrusion (600 x 10 x 10)](https://a.co/d/0i9hzxDB)
- [3-pin cable extension](https://a.co/d/07lWsfC2)

## designing the arm

After selecting the hardware, I searched the internet and found their CAD models. Using Onshape, I designed an initial concept, trying to minimise the footprint of the base as much as possible.

![Version -1, containing some highly ambitious geometry](./_assets/forward-kinematic-arm/initial_concept.png)

I had some decent ideas here, I think. The herringbone gears would allow the weight of the upper arm to sit on the ball bearings instead of the potentiometer, and slotting printed joinery into the T-slot extrusions would theoretically eliminate a lot of play.

However, this first design had two major issues. First, it couldn't hold down the bottom potentiometer firmly, because the base was one solid piece of plastic with limited accessibility. Second, it overly relies on small parts that are difficult to print, such as the prongs that slot into the extrusions and the teeth on the gears. After completing an initial print, I immediately knew that it was time to go back to the drawing board.

![Small details print poorly, preventing an accurate fit](./_assets/forward-kinematic-arm/small_component_issue.jpg)

## a second revision

Based on the issues encountered with the first concept, I decided to reduce the complexity as much as possible. The second version has a new base potentiometer attachment and a split base to provide easier access. Instead of using gears, all the joints clamp onto the potentiometers' knobs. I also made sure to add cutouts, increasing flex where needed to account for the fact that 3D printed parts would not be dimensionally exact.

![Second revision with the new potentiometer mount and clamping approach](./_assets/forward-kinematic-arm/second_revision.png)

---

## fabricating parts

It's pretty rare that things will translate perfectly from CAD to the real world, and even though Bambulab makes pretty good printers, functional parts still need a bit of tuning. I quickly found this out while testing the press fits for the ball bearings.

![Most parts failed along the layer lines or had insufficient clearance](./_assets/forward-kinematic-arm/failed_parts.png)

Most of the compliant parts turned out alright, although the clamp on the bottom potentiometer went through a couple more prints. Because it needs to clamp more strongly than the other joints (being the thing that keeps the rotating stack together), I often broke it by overtightening or by making it too thick and not sufficiently compliant.

During this process of making small adjustments to the part designs, I learned something new about 3D printing. Printing multiple small parts on the same plate can allow for a little more time for each layer to cool, thereby improving dimensional accuracy.

## assembly

Putting together this arm was fairly simple, since I was always making sure that it was theoretically possible to put together. However, there were still sometimes difficulties reaching into the little crevices and being able to apply pressure to the side of a nut to fasten it. I wish I had a photo to show here, but some serious finger acrobatics were required. Things in CAD always look a lot larger than they end up being in real life.

---

## interfacing with the sensors

## forward kinematics

## automatic calibration

## gravitational search

## results & cloning demo

---

## reflections

If I were to do something like this again, I would primarily focus on improving the mechanical reliability. For example, to reduce play in the coaxial direction of the joints, I would make each joint wider, with disc-like contact areas instead of being pivots on a fixed screw. I would also change the mounting of the rotating platform, either adding compression or using four bearing stacks to prevent the large torque from the arm's weight from loosening the clamp on the potentiometer over time.

Swapping out the potentiometers for Hall effect sensors would also be a good idea, since it would provide greater resolution and stronger linearity. It helps to clarify if the small errors I saw were caused by measurement error when collecting calibration data or by poor metaheuristic tuning.

I had a lot of fun working on this, and though I'm happy with what it does right now, I wouldn't mind taking another crack at the problem.
