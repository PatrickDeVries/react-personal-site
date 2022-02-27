import { useFrame, useThree } from '@react-three/fiber'
import React, { Dispatch, MutableRefObject, SetStateAction, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { BufferAttribute, BufferGeometry, Points, ShaderMaterial } from 'three'
import {
  Circle,
  escapeRadius,
  generateRectangleFromCenter,
  generateStar,
  getNewAngle,
  isCircle,
  isInCircle,
  isInPolygon,
  Point2d,
} from '../../utils/geometry'
import './particlematerial'
import { fragment, vertex } from './particlematerial'

const GetShaderMaterial: React.FC<{
  colorA: string
  colorB: string
  bboxMin: number
  bboxMax: number
}> = props => {
  const ref = useRef<ShaderMaterial>()

  const uniforms = useMemo(
    () =>
      THREE.UniformsUtils.merge([
        {
          colorA: { value: new THREE.Color(props.colorA) },
          colorB: { value: new THREE.Color(props.colorB) },
          bboxMin: { value: props.bboxMin },
          bboxMax: { value: props.bboxMax },
        },
      ]),
    [],
  )

  // this works, but is not dependent on props
  useFrame(state => {
    ref.current.uniforms.colorA.value = new THREE.Color(props.colorA)
    ref.current.uniforms.colorB.value = new THREE.Color(props.colorB)
    ref.current.uniforms.bboxMin.value = props.bboxMin
    ref.current.uniforms.bboxMax.value = props.bboxMax
  })

  return (
    <shaderMaterial
      ref={ref}
      attach="material"
      uniforms={uniforms}
      vertexShader={vertex}
      fragmentShader={fragment}
    />
  )
}

type Props = {
  top: number
  pathname: string

  particleCount: number
  baseV: number
  vVar: number
  baseTurnV: number
  turnVar: number
  freeThinkers: number
  mouseSize: number
  colorA: string
  colorB: string

  positions: number[]
  setPositions: Dispatch<SetStateAction<number[]>>
  velocities: number[]
  setVelocities: Dispatch<SetStateAction<number[]>>
  angles: number[]
  setAngles: Dispatch<SetStateAction<number[]>>

  particles: MutableRefObject<BufferGeometry>
}

const Particles: React.FC<Props> = ({
  top,
  pathname,

  particleCount,
  baseV,
  vVar: vVariance,
  baseTurnV: baseTurnSpeed,
  turnVar: turnVariance,
  freeThinkers,
  mouseSize,
  colorA,
  colorB,

  positions,
  setPositions,
  velocities,
  setVelocities,
  angles,
  setAngles,

  particles,
}) => {
  const viewport = useThree(state => state.viewport)
  const viewportTop = top * (viewport.height / window.innerHeight)
  const pointRef = useRef<Points>()
  const sizes = []

  const avoid =
    pathname === '/'
      ? [
          {
            vertices: generateStar(
              viewport.width < viewport.height ? viewport.width * 0.4 : viewport.height * 0.48,
              { x: 0, y: -viewportTop },
            ),
          },
        ]
      : pathname === '/portfolio'
      ? [
          {
            x: -viewport.width / 4,
            y: -viewport.height / 4 - viewportTop / 2,
            radius: viewport.height / 5,
          },
          {
            x: -viewport.width / 4,
            y: viewport.height / 4 - viewportTop / 2,
            radius: viewport.height / 5,
          },
          {
            x: viewport.width / 4,
            y: -viewport.height / 4 - viewportTop / 2,
            radius: viewport.height / 5,
          },
          {
            x: viewport.width / 4,
            y: viewport.height / 4 - viewportTop / 2,
            radius: viewport.height / 5,
          },
        ]
      : pathname === '/contact'
      ? [
          {
            vertices: generateRectangleFromCenter(
              { x: 0, y: -viewportTop / 2 },
              viewport.height - viewport.width / 10,
              viewport.width - viewport.width / 10,
            ),
          },
        ]
      : []

  const maxes: Point2d[] = avoid.map(a =>
    isCircle(a)
      ? { x: 0, y: 0 }
      : {
          x: Math.max.apply(
            Math,
            a.vertices.map(v => v.x),
          ),
          y: Math.max.apply(
            Math,
            a.vertices.map(v => v.y),
          ),
        },
  )
  const mins: Point2d[] = avoid.map(a =>
    isCircle(a)
      ? { x: 0, y: 0 }
      : {
          x: Math.min.apply(
            Math,
            a.vertices.map(v => v.x),
          ),
          y: Math.min.apply(
            Math,
            a.vertices.map(v => v.y),
          ),
        },
  )

  for (let i = 0; i < 999999; i++) {
    sizes.push(5)
  }

  if (positions.length < particleCount) {
    const newPositions = []
    const newVelocities = []
    const newAngles = []
    for (let i = 0; i < 999999; i++) {
      newPositions.push(
        Math.random() * viewport.width - viewport.width / 2,
        Math.random() * viewport.height - viewport.height / 2 - viewportTop,
        0,
      )
      newVelocities.push(Math.random(), Math.random(), 0)
      let newA = Math.random() * 2 * Math.PI
      if (
        newA < 0.01 ||
        newA > Math.PI - 0.01 ||
        (newA < Math.PI / 2 + 0.01 && newA > Math.PI / 2 - 0.01) ||
        (newA < Math.PI / 4 + 0.01 && newA > Math.PI / 4 - 0.01) ||
        (newA < (Math.PI * 3) / 4 + 0.01 && newA > (Math.PI * 3) / 4 - 0.01)
      ) {
        newA += 0.03
      }
      newAngles.push(newA)
    }

    setPositions(newPositions)
    setVelocities(newVelocities)
    setAngles(newAngles)
  }

  let mouse = useRef({ x: 0, y: 0 })

  if (document) {
    document.onmousemove = event => {
      mouse.current = {
        x: ((event.clientX - 0) * viewport.width) / window.innerWidth + -viewport.width / 2,
        y: ((event.clientY - 0) * -viewport.height) / window.innerHeight + viewport.height / 2,
      }
    }
    document.ontouchmove = event => {
      mouse.current = {
        x:
          ((event.changedTouches[0].clientX - 0) * viewport.width) / window.innerWidth +
          -viewport.width / 2,
        y:
          ((event.changedTouches[0].clientY - 0) * -viewport.height) / window.innerHeight +
          viewport.height / 2,
      }
    }
  }

  const updatePositions = () => {
    if (particles.current) {
      const pps: BufferAttribute = particles.current['attributes']['position'] as BufferAttribute
      const pvs: BufferAttribute = particles.current['attributes']['velocity'] as BufferAttribute
      const pas: BufferAttribute = particles.current['attributes']['angle'] as BufferAttribute

      for (let i = 0, l = particleCount; i < l; i++) {
        const angle = pas.getX(i)
        const v = pvs.getX(i) * vVariance + baseV
        const turnV = pvs.getY(i) * turnVariance + baseTurnSpeed

        pps.setXY(i, pps.getX(i) + v * Math.cos(angle), pps.getY(i) + v * Math.sin(angle))

        const flipX = pps.getX(i) > viewport.width / 2 || pps.getX(i) < -viewport.width / 2
        const flipY =
          pps.getY(i) > viewport.height / 2 - viewportTop || pps.getY(i) < -viewport.height / 2

        if (
          [...avoid, { x: mouse.current.x, y: mouse.current.y, radius: mouseSize } as Circle]
            .map((boundary, bindex) => {
              if (isCircle(boundary)) {
                if (
                  boundary.radius > 0 &&
                  isInCircle(
                    { x: pps.getX(i), y: pps.getY(i) },
                    { x: boundary.x, y: boundary.y, radius: boundary.radius },
                  )
                ) {
                  pas.setX(
                    i,
                    escapeRadius(
                      { x: pps.getX(i), y: pps.getY(i), angle, turnV },
                      { x: boundary.x, y: boundary.y, radius: boundary.radius },
                      1.5,
                    ),
                  )
                  return true
                }
              } else {
                if (
                  isInPolygon(
                    { x: pps.getX(i), y: pps.getY(i) },
                    maxes[bindex],
                    mins[bindex],
                    boundary.vertices,
                  )
                ) {
                  pas.setX(
                    i,
                    escapeRadius(
                      { x: pps.getX(i), y: pps.getY(i), angle, turnV },
                      {
                        x: (maxes[bindex].x + mins[bindex].x) / 2,
                        y: (maxes[bindex].y + mins[bindex].y) / 2,
                        radius: Math.max.apply(Math, [viewport.width, viewport.height]),
                      },
                      1.5,
                    ),
                  )
                  return true
                }
              }
            })
            .some(val => val)
        ) {
          continue
        }
        if (flipX || flipY) {
          pas.setX(
            i,
            Math.atan2((flipY ? -v : v) * Math.sin(angle), (flipX ? -v : v) * Math.cos(angle)),
          )
          // reset if it has somehow escaped
          if (
            pps.getX(i) + v * Math.cos(pas.getX(i)) > viewport.width / 2 ||
            pps.getX(i) + v * Math.cos(pas.getX(i)) < -viewport.width / 2 ||
            pps.getY(i) + v * Math.sin(pas.getX(i)) > viewport.height - viewportTop / 2 ||
            pps.getY(i) + v * Math.sin(pas.getX(i)) < -viewport.height / 2
          ) {
            pps.setXY(i, 0, 0)
          }
        } else if (freeThinkers === 0) {
          let goalAngle = 0
          if (i === 0) {
            goalAngle = Math.atan2(
              pps.getY(particleCount - 1) - pps.getY(i),
              pps.getX(particleCount - 1) - pps.getX(i),
            )
          } else {
            goalAngle = Math.atan2(pps.getY(i - 1) - pps.getY(i), pps.getX(i - 1) - pps.getX(i))
          }
          const newAngle = getNewAngle(angle, goalAngle, turnV)

          pas.setX(i, newAngle)
        } else if (i % Math.ceil(particleCount / freeThinkers) !== 0 && i > 0) {
          // non-free particles
          const goalAngle = Math.atan2(pps.getY(i - 1) - pps.getY(i), pps.getX(i - 1) - pps.getX(i))
          const newAngle = getNewAngle(angle, goalAngle, turnV)

          pas.setX(i, newAngle)
        }
      }
    }
  }

  useFrame(() => {
    updatePositions()
    particles.current['attributes']['position'].needsUpdate = true
  })

  return (
    <points ref={pointRef}>
      <bufferGeometry ref={particles} attach="geometry">
        <bufferAttribute
          attachObject={['attributes', 'position']}
          count={particleCount}
          array={new Float32Array(positions)}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'velocity']}
          count={particleCount}
          array={new Float32Array(velocities)}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'angle']}
          count={particleCount}
          array={new Float32Array(angles)}
          itemSize={1}
        />
        <bufferAttribute
          attachObject={['attributes', 'size']}
          count={particleCount}
          array={new Float32Array(sizes)}
          itemSize={1}
        />
      </bufferGeometry>
      <GetShaderMaterial colorA={colorA} colorB={colorB} bboxMin={-1} bboxMax={1} />
    </points>
  )
}

export default Particles
