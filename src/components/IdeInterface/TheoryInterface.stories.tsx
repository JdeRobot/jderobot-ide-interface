import React from "react";
import type { Meta, StoryObj } from "@storybook/react-webpack5";
import TheoryInterface from "./TheoryInterface";
import {
  CarouselDisplay,
  ComparisonDisplay,
  HighlightedSection,
  TheoryList,
  TheorySection,
  TheorySubsection,
  Timeline,
  TimelineComparison,
  YoutubeVideo,
  Image
} from "../Theory";

import abb from "./tmp/ABB.png";
import aeolus from "./tmp/aeolus.jpg";
import agrobot from "./tmp/agrobot.jpg";
import alexa from "./tmp/alexa.jpg";
import mapLocal from "./tmp/mapLocal.png";
import mapGlobal from "./tmp/mapGlobal.png";
import mapDynamic from "./tmp/mapDynamic.png";

type Story = StoryObj<typeof TheoryInterface>;

const meta: Meta<typeof TheoryInterface> = {
  component: TheoryInterface,
};

export default meta;

export const Main: Story = {
  render: () => (
    <div style={{ width: "100vw", height: "100vh" }}>
      <TheoryInterface
        title="Test"
        index={[
          {
            href: "#intro",
            title: "Introduction",
            subsections: [
              { href: "#intro1", title: "Robotic products" },
              { href: "#intro2", title: "Research" },
            ],
          },
          {
            href: "#comp",
            title: "Components",
            subsections: [
              { href: "#comp1", title: "Sensors" },
              { href: "#comp2", title: "Actuators" },
              { href: "#comp3", title: "Controllers" },
              { href: "#comp4", title: "Concepts" },
            ],
          },
          {
            href: "#software",
            title: "Software",
            subsections: [
              {
                href: "#software1",
                title: "Robot Operating System (ROS)",
              },
              { href: "#software2", title: "Simulators" },
              {
                href: "#software3",
                title: "Typical ingredients of a robotic program",
              },
              { href: "#software4", title: "Cognitive architecture" },
              { href: "#software5", title: "Robot programming" },
              {
                href: "#software6",
                title: "Skills to Integrate and create code",
              },
              {
                href: "#software7",
                title: "Different software design approaches",
              },
            ],
          },
          {
            href: "#history",
            title: "History",
            subsections: [
              { href: "#history1", title: "Automatons" },
              { href: "#history2", title: "Early years" },
              { href: "#history3", title: "Cybernetics (1950s)" },
              { href: "#history4", title: "Electronics (1960s)" },
              { href: "#history5", title: "Computers (1970s)" },
              { href: "#history6", title: "Embedded computers (1980s)" },
              {
                href: "#history7",
                title: "Navigation in real environments (1990s)",
              },
              { href: "#history8", title: "Developments cince the 2000s" },
              { href: "#history9", title: "The future" },
              { href: "#history10", title: "Timeline" },
            ],
          },
        ]}
      >
        <TheorySection
          href={"intro"}
          title="Robotics fiction, robotic products, and research"
        >
          <p>
            <strong>Robotics fiction</strong> appears in movies, TV series and
            literature, often depicting technologies beyond what is currently
            possible in reality. On the other hand,{" "}
            <strong>real robotics</strong> is a rapidly growing field that
            provides increasingly useful robotic applications to society. Robots
            usually handle the “dull”, “dirty” and “dangerous” tasks that humans
            prefer not to perform.
          </p>

          <Image title={"Test img"} caption={"Robot programming cycle"} src={abb}/>

          <YoutubeVideo title="Test" id="XzgfaQ20atY"/>

          <TimelineComparison
            title="Method comparison"
            timelines={[
              {
                title: "Section1",
                timeline: [
                  {
                    title: "Automatons",
                    desc: "Clear map",
                    image: aeolus,
                  },
                  {
                    title: "Early years",
                    desc: "Place obstacles",
                    image: abb,
                  },
                  {
                    title: "Cybernetics (1950s)",
                    desc: "Construction of the graph:\n- One node per vertex.\n- One arc for each pair of nodes (without intersecting objects)",
                    image: alexa,
                  },
                ],
              },
              {
                title: "Section2",
                timeline: [
                  {
                    title: "Early years",
                    desc: "Clear map",
                    image: abb,
                  },
                  {
                    title: "Cybernetics (1950s)",
                    desc: "Construction of the rest of the graph:\n- One node for the start and another one for the goal.\n- One arc for each pair of nodes (without intersecting objects)",
                    image: alexa,
                  },
                ],
              },
              undefined,
              {
                title: "Section3",
                timeline: [
                  {
                    title: "Early years",
                    desc: "Clear map",
                    image: abb,
                  },
                  {
                    title: "Cybernetics (1950s)",
                    desc: "Construction of the rest of the graph:\n- One node for the start and another one for the goal.\n- One arc for each pair of nodes (without intersecting objects)",
                    image: alexa,
                  },
                ],
              },
            ]}
          />

          <Timeline
            title="History of robotics"
            timeline={[
              {
                title: "Automatons",
                desc: [
                  "Mechanical machines imitating humans",
                  "Jaquemarts: bell-striking puppet",
                  "Papamoscas: Burgos Cathedral, Spain",
                  "Maillardet writing and drawing machine",
                ],
                image: aeolus,
                link: "https://fi.edu/en/science-and-education/collection/maillardets-automaton",
              },
              {
                title: "Early years",
                desc: [
                  "1947: first servo-controlled manipulator",
                  "1952: first numerically controlled machine",
                  "1954: first programmable manipulator",
                  "1978: PUMA robot launched by Unimation",
                ],
                image: abb,
                link: "https://spectrum.ieee.org/unimation-robot",
              },
              {
                title: "Cybernetics (1950s)",
                desc: [
                  "Grey Walter invented small mobile robots",
                  "nicknamed turtles with phototube eyes",
                  "Detected lights and moved toward them",
                  "Spun and searched for charging stations",
                ],
                image: alexa,
                link: "https://spectrum.ieee.org/meet-roombas-ancestor-cybernetic-tortoise",
              },
            ]}
          />

          <ComparisonDisplay
            title="Types of robots"
            data={[
              {
                section: "Industry and manufacturing",
                images: [
                  {
                    title: "KUKA",
                    desc: "Robotic arms for industrial tasks",
                    img: mapLocal,
                  },
                  {
                    title: "FANUC",
                    desc: "Factory automation systems",
                    img: mapGlobal,
                  },
                ],
              },
              {
                section: "Section2",
                images: [
                  {
                    title: "KUKA",
                    desc: "Robotic arms for industrial tasks",
                    img: mapGlobal,
                  },
                  {
                    title: "ABB Robotics",
                    desc: "Automation in multiple sectors",
                    img: mapDynamic,
                  },
                ],
              },
            ]}
          />

          <TheorySubsection href={"intro1"} title="Robotic products">
            <p>
              Nowadays, there are many robots that surround and accompany us in
              various areas of daily life:
            </p>
            <CarouselDisplay
              title="Types of robots"
              data={[
                {
                  section: "Industry and manufacturing",
                  images: [
                    {
                      title: "KUKA",
                      desc: "Robotic arms for industrial tasks",
                      img: aeolus,
                    },
                    {
                      title: "FANUC",
                      desc: "Factory automation systems",
                      img: agrobot,
                    },
                    {
                      title: "Yaskawa Motoman",
                      desc: "Industrial handling robot",
                      img: alexa,
                    },
                    {
                      title: "Yaskawa Motoman",
                      desc: "Industrial handling robot",
                      img: alexa,
                    },
                  ],
                },
                {
                  section: "Section2",
                  images: [
                    {
                      title: "KUKA",
                      desc: "Robotic arms for industrial tasks",
                      img: aeolus,
                    },
                    {
                      title: "ABB Robotics",
                      desc: "Automation in multiple sectors",
                      img: abb,
                    },
                  ],
                },
              ]}
            />
          </TheorySubsection>

          <TheorySubsection href={"intro2"} title="Research">
            <p>
              The main goal of robotics is to generate{" "}
              <strong>autonomous behavior</strong> (intelligence) in mobile
              robots. The more autonomy, the more applications. As seen earlier,{" "}
              <strong>robots</strong> are multidisciplinary: electronics,
              computer science, psychology, ethology… In the future, every home
              may have a robot, much like we all have a PC today.
            </p>
            <p>
              Although movies and desires often outpace reality, work continues
              to bring these ideas to life, achieving real progress focused on
              prototypes and robustness. Today, research and advances occur in
              many areas:
            </p>

            <TheoryList>
              <li>Autonomous cars</li>
              <li>Drones</li>
              <li>Mapping, self-localization, and navigation</li>
              <li>Humanoids</li>
              <li>Human interaction</li>
              <li>Cooperative robot groups</li>
              <li>Robot vision</li>
              <li>
                Robotics championships: RoboCup (soccer, home, rescue, etc.),
                DARPA, Rockin, etc.
              </li>
            </TheoryList>
          </TheorySubsection>
        </TheorySection>

        {/* Point 2 */}
        <TheorySection href={"comp"} title="Components of robots">
          <HighlightedSection>
            A <strong>robot</strong> is a computational system equipped with
            sensors, actuators and onboard computing. It must be programmed to
            achieve its goals and be responsive to situations. Therefore, we can
            affirm that intelligence resides in the <strong>software</strong> of
            a robot.
          </HighlightedSection>

          <TheorySubsection href={"comp1"} title="Sensors">
            <p>
              Sensors measure physical magnitudes from the robot’s environment
              (distance, light, etc.). When designing them, the developer tries
              to “place themselves” in the robot’s world. The data perceived
              will depend on the robot’s sensors.
            </p>

            <p>
              The robot exists within the sensor space. Furthermore, each
              robot’s sensors depend on the task to be performed. Additionally,
              robotic sensors differ significantly from biological ones.
            </p>

            <p>
              Some types of sensors are: 2D cameras, RGBD cameras (with depth
              capture), ultrasound, laser, LIDAR, or encoders (sensors).
            </p>
          </TheorySubsection>
          <h4 id="comp2" className="text-lg font-semibold">
            2.2. Actuators
          </h4>
          <p>
            A <strong>robot</strong> interacts with the world through its
            actuators, which provide movement capability or other
            functionalities. Like sensors, robotic actuators differ greatly from
            biological ones.
          </p>

          <p>They are divided into two main groups:</p>

          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Locomotion</strong>: moving from one place to another
            </li>
            <li>
              <strong>Manipulation</strong>: handling objects
            </li>
          </ul>

          <p>
            Additionally, actuators allow robotics to be divided into two major
            fields:
          </p>

          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Mobile robots</strong>
            </li>
            <li>
              <strong>Manipulative robots or arms</strong>
            </li>
          </ul>

          <p>
            Some types of actuators include: electric motors, locomotion
            systems, manipulation systems, etc.
          </p>

          <h4 id="comp3" className="text-lg font-semibold">
            2.3. Computers
          </h4>
          <p>
            To enable communication with other robots or computers,
            microprocessors, microcontrollers, computers, and other electronic
            devices are used. This creates networks. Moreover, to facilitate
            interaction with humans, <strong>robots</strong> use user
            interfaces, screens, buttons, or audio.
          </p>

          <h4 id="comp4" className="text-lg font-semibold">
            2.4. Concepts
          </h4>
          <ul className="list-disc list-inside ml-4">
            <li>
              <strong>Autonomy</strong>: ability to perceive the situation and
              act appropriately without external intervention.
            </li>
            <li>
              <strong>Teleoperation</strong>: remote manipulation by a human.
            </li>
            <li>
              <strong>Telepresence</strong>: remote sensing for a human. There
              are three types:
              <ul className="list-disc list-inside ml-4">
                <li>
                  <strong>Autonomous</strong>: R2D2.
                </li>
                <li>
                  <strong>Teleoperators</strong>: manipulators for hazardous
                  materials, Prestige, etc.
                </li>
                <li>
                  <strong>Semi-autonomous</strong>: PathFinder.
                </li>
              </ul>
            </li>
            <li>
              <strong>Action</strong>: an order or set of orders executed by the
              robot’s actuators.
            </li>
            <li>
              <strong>Behavior</strong>: what an external observer sees a robot
              doing. Perception and action integrated with a goal. It is the
              result of a sequence of robot actions. However, these may not
              reveal much about the robot’s internal control, which is
              considered a black box.
            </li>
            <li>
              <strong>Robotics</strong>: discipline that studies systems that
              create an intelligent connection between the perceptual system and
              the actuation system.
            </li>
          </ul>
        </TheorySection>
      </TheoryInterface>
    </div>
  ),
};
