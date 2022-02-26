export const PI2 = Math.PI * 2

///
/// Types
///

export type Point2d = {
  x: number
  y: number
}

export type Circle = Point2d & {
  radius: number
}
export const isCircle = (b: any): b is Circle => b.radius

export type Polygon = {
  vertices: Point2d[]
}

///
/// Intersection checks
///

/// Circle
export const isInRadius = (point: Point2d, circle: Circle): boolean => {
  return Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius
}

/// Polygon
function onSegment(p, q, r) {
  if (
    q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y)
  )
    return true

  return false
}

function orientation(p, q, r) {
  // See https://www.geeksforgeeks.org/orientation-3-ordered-points/
  // for details of below formula.
  let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y)

  if (val == 0) return 0 // collinear

  return val > 0 ? 1 : 2 // clock or counterclock wise
}

function doIntersect(p1, q1, p2, q2) {
  // Find the four orientations needed for general and
  // special cases
  let o1 = orientation(p1, q1, p2)
  let o2 = orientation(p1, q1, q2)
  let o3 = orientation(p2, q2, p1)
  let o4 = orientation(p2, q2, q1)

  // General case
  if (o1 != o2 && o3 != o4) return true

  // Special Cases
  // p1, q1 and p2 are collinear and p2 lies on segment p1q1
  if (o1 == 0 && onSegment(p1, p2, q1)) return true

  // p1, q1 and q2 are collinear and q2 lies on segment p1q1
  if (o2 == 0 && onSegment(p1, q2, q1)) return true

  // p2, q2 and p1 are collinear and p1 lies on segment p2q2
  if (o3 == 0 && onSegment(p2, p1, q2)) return true

  // p2, q2 and q1 are collinear and q1 lies on segment p2q2
  if (o4 == 0 && onSegment(p2, q1, q2)) return true

  return false // Doesn't fall in any of the above cases
}

export const isInPolygon = (
  point: Point2d,
  max: Point2d,
  min: Point2d,
  vertices: Point2d[],
): boolean => {
  if (point.x > max.x || point.x < min.x || point.y > max.y || point.y < min.y) {
    return false
  } else {
    const wrappingVertices = [vertices[vertices.length - 1], ...vertices]
    // console.log([vertices[vertices.length - 1], ...vertices])
    return (
      wrappingVertices.filter(
        (v, index) =>
          index > 0 && doIntersect(v, wrappingVertices[index - 1], point, { x: 1000, y: point.y }),
      ).length %
        2 ===
      1
    )
  }
}

///
/// Utilities for moving points based on geometries
///

export const getNewAngle = (angle: number, goalAngle: number, turnV: number) =>
  (((goalAngle - angle + Math.PI) % PI2) - Math.PI < turnV
    ? goalAngle
    : goalAngle > (angle + Math.PI) % PI2
    ? angle - turnV
    : angle + turnV) % PI2

export const escapeRadius = (
  point: Point2d & { angle: number; turnV: number },
  circle: Circle,
  boostSpeed = 1,
) => {
  const angleFromCircle = Math.atan2(point.y - circle.y, point.x - circle.x)
  return getNewAngle(point.angle, angleFromCircle, point.turnV * boostSpeed) // slight boost to turn speed to make mouse circle cleaner
}
