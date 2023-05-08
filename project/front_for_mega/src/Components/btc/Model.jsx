import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import { useGLTF } from "@react-three/drei";
import scene from './scene.glb';
import {useFrame} from "@react-three/fiber";
import gsap from 'gsap';
import axios from "axios";

export function Model(props) {
    const { nodes, materials } = useGLTF(scene);
    const mod = useRef();
    const tl = useRef();
    useEffect(() => {
        let interval = setInterval(() => {
            tl.current = gsap.timeline({defaults: {duration: 10, ease: 'power1.inOut'}})

            tl.current
                .to(mod.current.rotation, {x: -6.285,repeatDelay: 1,    repeat: 3}, 'infinity')

            setScales(5);
            const i = setTimeout(() => {
                setScales(10);
            }, 5000)
            clearTimeout(i);
            return () => {
                clearTimeout(interval);
            };
        }, 5000);
        return () => {
            clearTimeout(interval);
        };
    }, []);
    useLayoutEffect(()=> {
        tl.current = gsap.timeline({defaults: {duration: 10, ease: 'power1.inOut'}})

        tl.current
            .to(mod.current.rotation, {y: -6.285,repeatDelay: 1,    repeat: 999999}, 'infinity')


        // tl.current = gsap.timeline({defaults: {duration: 10, ease: 'power1.inOut'}})


        // tl.current
        //     .to(mod.current.scale, { x: 4 }, 'infinity')


        // tl.current
        //     .to(mod.current.transform, { y: '-150px' }, 'infinity')

        // gsap.to(mod.current.transform,  { y: 18 });

    },[])


    let [scales, setScales] = useState(10);
    return (
        <group  {...props} ref={mod} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, -0.4]}>
                <group rotation={[Math.PI / 2, 0, 0]}>
                    <group rotation={[-Math.PI / 2, 0, 0]} scale={scales}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes["16783_Zeus_v1_NEW001_oro2_0"].geometry}
                            material={materials.oro2}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes["16783_Zeus_v1_NEW001_oro2_0_1"].geometry}
                            material={materials.oro2}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes["16783_Zeus_v1_NEW001_oro2_0_2"].geometry}
                            material={materials.oro2}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes["16783_Zeus_v1_NEW001_oro2_0_3"].geometry}
                            material={materials.oro2}
                        />
                    </group>
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/scene.gltf");