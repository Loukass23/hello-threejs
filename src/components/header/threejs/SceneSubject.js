import * as THREE from 'three'
import alphaTexture from '../../../assets/textures/stripes_gradient.jpg';
import { CSS2DRenderer, CSS2DObject } from './CSS2DRenderer';
import TextSprite from '@seregpie/three.text-sprite';
import TextTexture from '@seregpie/three.text-texture';
import { bestSkills } from '../../../content/skills'

export default class SceneSubjects {
    constructor(scene) {
        const group = new THREE.Group();
        const textGroup = new THREE.Group();
        const boxGroup = new THREE.Group();
        var vertices = new THREE.DodecahedronGeometry(10).vertices;
        // const subjectGeometry = deformGeometry(new THREE.BoxGeometry(20, 20, 5, 2, 4, 2));
        const subjectGeometry = new THREE.IcosahedronGeometry(5);
        // var meshGeometry = new deformGeometry(ConvexBufferGeometry( vertices ));
        const subjectMaterial = new THREE.MeshStandardMaterial({ color: "#000", transparent: true, side: THREE.AdditiveBlending, alphaTest: 0.1 });
        subjectMaterial.alphaMap = new THREE.TextureLoader().load(alphaTexture);
        subjectMaterial.alphaMap.magFilter = THREE.NearestFilter;
        subjectMaterial.alphaMap.wrapT = THREE.RepeatWrapping;
        // subjectMaterial.alphaMap.repeat.y = 10;

        const subjectMesh = new THREE.Mesh(subjectGeometry, subjectMaterial);

        const subjectWireframe = new THREE.LineSegments(
            new THREE.EdgesGeometry(subjectGeometry),
            new THREE.LineBasicMaterial(),

        );

        let texture = new TextTexture({
            fillStyle: '#24ff00',
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: 32,
            text: 'Developer'
            // text: [
            //     'Twinkle, twinkle, little star,',
            //     'How I wonder what you are!',
            //     'Up above the world so high,',
            //     'Like a diamond in the sky.',
            // ].join('\n'),
        });
        let material = new THREE.SpriteMaterial(
            {
                alphaMap: texture,
                isSpriteMaterial: true,

            });
        let sprite = new THREE.Sprite(material);
        let spriteScale = 10;
        texture.redraw();
        // sprite.scale
        //     .set(texture.image.width / texture.image.height, 1, 1)
        //     .multiplyScalar(spriteScale);
        // scene.add(sprite);
        var pointsMaterial = new THREE.PointsMaterial({

            color: 0x0080ff,
            map: new THREE.TextureLoader().load(alphaTexture),
            size: 10,
            alphaTest: 0.5,
            alphaMap: texture


        });


        //Points


        // var textParams = {
        //     height: 20,
        //     size: 70,
        //     hover: 30,
        //     curveSegments: 4,
        //     bevelThickness: 2,
        //     bevelSize: 1.5,
        //     bevelEnabled: true,
        //     font: undefined,
        //     fontName: "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
        //     fontWeight: "bold" // normal bold
        // }
        // var textGeometry = new THREE.TextGeometry("text", textParams)

        // var pointsGeometry = new THREE.BufferGeometry().fromGeometry(textGeometry);
        // var pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
        // const pointsGeometry = new THREE.IcosahedronGeometry(20, 2);

        const pointsGeometry = deformGeometry(new THREE.RingGeometry(10));
        var points = new THREE.Points(pointsGeometry, pointsMaterial);
        // var points = new THREE.Points(pointsGeometry, pointsMaterial);
        console.log('points :', points.geometry.vertices);
        let pointsVertices = points.geometry.vertices

        var loader = new THREE.FontLoader();
        loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json', async (font) => {

            bestSkills.forEach((str, i) => {
                var textGeo = new THREE.TextGeometry(str, {
                    font: font,
                    size: 1,
                    height: 1,
                })


                textGeo.center()
                // await textGeo.position.set(foo.x, foo.y, foo.z)
                // var textmaterial = new THREE.MeshNormalMaterial({ color: '#5b0f0f' });
                var textmaterial = new THREE.MeshPhongMaterial(
                    { color: 0x5b0f0f, specular: 0x000000 }
                );
                var textMesh1 = new THREE.Mesh(textGeo, textmaterial);

                textMesh1.position.set(pointsVertices[i].x, pointsVertices[i].y, pointsVertices[i].z)
                textGroup.add(textMesh1);
            })


        });


        var geometry = new THREE.BoxGeometry(4, 4, 4, 4, 4, 4)
        // geometry.center();
        var box = new THREE.Mesh(geometry, subjectMaterial);
        // object.position.set(foo.x, foo.y, foo.z);
        boxGroup.add(box);

        // 
        // var obj = new THREE.Geometry()
        // obj.setFromPoints = foo
        // var object = new THREE.Mesh(obj, material);
        // object.position.set(0, 0, 0);




        // group.add(sprite
        // group.add(text);
        // group.add(subjectMesh);
        group.add(subjectWireframe);
        scene.add(group);
        scene.add(textGroup);
        scene.add(boxGroup);


        group.rotation.z = Math.PI / 4;
        boxGroup.rotation.z = Math.PI / 4;

        const speed = 0.02;
        const textureOffsetSpeed = 0.02;

        function deformGeometry(geometry) {
            for (let i = 0; i < geometry.vertices.length; i += 2) {
                const scalar = 1 + Math.random() * 0.8;
                geometry.vertices[i].multiplyScalar(scalar)
            }

            return geometry;
        }

        function update(time) {
            const angle = time * speed;

            group.rotation.y = angle;
            boxGroup.rotation.y = -(angle * 50);

            subjectMaterial.alphaMap.offset.y = 0.55 + time * textureOffsetSpeed;

            subjectWireframe.material.color.setHSL(Math.sin(angle * 2), 0.5, 0.5);

            const scale = (Math.sin(angle * 8) + 6.4) / 5;
            const scale2 = (Math.sin(angle * 8) + 6.4) / 8;
            subjectWireframe.scale.set(scale, scale, scale)
            textGroup.scale.set(scale2, scale2, scale2)
        }

        return {
            update
        }
    }
}