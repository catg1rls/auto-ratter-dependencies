const lineSphere = new org.lwjgl.util.glu.Sphere();
lineSphere.drawStyle = org.lwjgl.util.glu.GLU.GLU_LINE;

const lineCylinder = new org.lwjgl.util.glu.Cylinder();
lineCylinder.drawStyle = org.lwjgl.util.glu.GLU.GLU_LINE;

const lineDisk = new org.lwjgl.util.glu.Disk();
lineDisk.drawStyle = org.lwjgl.util.glu.GLU.GLU_LINE;

const regSphere = new org.lwjgl.util.glu.Sphere();

const regCylinder = new org.lwjgl.util.glu.Cylinder();

const regDisk = new org.lwjgl.util.glu.Disk();

export default class RenderLib {
    /**
     * Draws the frame of a box
     * @param {number} x - X Coordinates
     * @param {number} y - Y Coordinates
     * @param {number} z - Z Coordinates
     * @param {number} w - Box Width
     * @param {number} h - Box Height
     * @param {number} red - Box Color Red 0-1
     * @param {number} green - Box Color Green 0-1
     * @param {number} blue - Box Color Blue 0-1
     * @param {number} alpha - Box Color Alpha 0-1
     * @param {boolean} phase - Depth test disabled. True: See through walls
     */
    static drawEspBox = (x, y, z, w, h, red, green, blue, alpha, phase) => {
        Tessellator.pushMatrix();
        GL11.glLineWidth(2.0);
        GlStateManager.func_179129_p(); // disableCullFace
        GlStateManager.func_179147_l(); // enableBlend
        GlStateManager.func_179112_b(770, 771); // blendFunc
        GlStateManager.func_179132_a(false); // depthMask
        GlStateManager.func_179090_x(); // disableTexture2D

        if (phase) {
            GlStateManager.func_179097_i() // disableDepth
        }

        const locations = [
            //    x, y, z    x, y, z
            [
                [0, 0, 0],
                [w, 0, 0],
            ],
            [
                [0, 0, 0],
                [0, 0, w],
            ],
            [
                [w, 0, w],
                [w, 0, 0],
            ],
            [
                [w, 0, w],
                [0, 0, w],
            ],

            [
                [0, h, 0],
                [w, h, 0],
            ],
            [
                [0, h, 0],
                [0, h, w],
            ],
            [
                [w, h, w],
                [w, h, 0],
            ],
            [
                [w, h, w],
                [0, h, w],
            ],

            [
                [0, 0, 0],
                [0, h, 0],
            ],
            [
                [w, 0, 0],
                [w, h, 0],
            ],
            [
                [0, 0, w],
                [0, h, w],
            ],
            [
                [w, 0, w],
                [w, h, w],
            ],
        ];

        locations.forEach((loc) => {
            Tessellator.begin(3).colorize(red, green, blue, alpha);

            Tessellator.pos(x + loc[0][0] - w / 2, y + loc[0][1], z + loc[0][2] - w / 2).tex(0, 0);

            Tessellator.pos(x + loc[1][0] - w / 2, y + loc[1][1], z + loc[1][2] - w / 2).tex(0, 0);

            Tessellator.draw();
        });

        GlStateManager.func_179089_o(); // enableCull
        GlStateManager.func_179084_k(); // disableBlend
        GlStateManager.func_179132_a(true); // depthMask
        GlStateManager.func_179098_w(); // enableTexture2D

        if (phase) {
            GlStateManager.func_179126_j(); // enableDepth
        }
        
        Tessellator.popMatrix();
    };

    /**
     * Draws the filled sides of a box
     * @param {number} x - X Coordinates
     * @param {number} y - Y Coordinates
     * @param {number} z - Z Coordinates
     * @param {number} w - Box Width
     * @param {number} h - Box Height
     * @param {number} red - Box Color Red 0-1
     * @param {number} green - Box Color Green 0-1
     * @param {number} blue - Box Color Blue 0-1
     * @param {number} alpha - Box Color Alpha 0-1
     * @param {boolean} phase - Depth test disabled. True: See through walls
     */
    static drawInnerEspBox = (x, y, z, w, h, red, green, blue, alpha, phase) => {
        Tessellator.pushMatrix();
        GL11.glLineWidth(2.0);
        GlStateManager.func_179129_p(); // disableCullFace
        GlStateManager.func_179147_l(); // enableBlend
        GlStateManager.func_179112_b(770, 771); // blendFunc
        GlStateManager.func_179132_a(false); // depthMask
        GlStateManager.func_179090_x(); // disableTexture2D

        if (phase) {
            GlStateManager.func_179097_i() // disableDepth
        }

        w /= 2;

        Tessellator.begin(GL11.GL_QUADS, false);
        Tessellator.colorize(red, green, blue, alpha);

        Tessellator.translate(x, y, z)
            .pos(w, 0, w)
            .pos(w, 0, -w)
            .pos(-w, 0, -w)
            .pos(-w, 0, w)

            .pos(w, h, w)
            .pos(w, h, -w)
            .pos(-w, h, -w)
            .pos(-w, h, w)

            .pos(-w, h, w)
            .pos(-w, h, -w)
            .pos(-w, 0, -w)
            .pos(-w, 0, w)

            .pos(w, h, w)
            .pos(w, h, -w)
            .pos(w, 0, -w)
            .pos(w, 0, w)

            .pos(w, h, -w)
            .pos(-w, h, -w)
            .pos(-w, 0, -w)
            .pos(w, 0, -w)

            .pos(-w, h, w)
            .pos(w, h, w)
            .pos(w, 0, w)
            .pos(-w, 0, w)
            .draw();

        GlStateManager.func_179089_o(); // enableCull
        GlStateManager.func_179084_k(); // disableBlend
        GlStateManager.func_179132_a(true); // depthMask
        GlStateManager.func_179098_w(); // enableTexture2D
        if (phase) {
            GlStateManager.func_179126_j(); // enableDepth
        }
                
        Tessellator.popMatrix();
    };

    /**
     * Draws a box like baritone with the top and bottom going up and down smoothly
     * @param {number} x - X Coordinates
     * @param {number} y - Y Coordinates
     * @param {number} z - Z Coordinates
     * @param {number} w - Box Width
     * @param {number} h - Box Height
     * @param {number} red - Box Color Red 0-1
     * @param {number} green - Box Color Green 0-1
     * @param {number} blue - Box Color Blue 0-1
     * @param {number} alpha - Box Color ALpha 0-1
     * @param {boolean} phase - Depth test disabled. True: See through walls
     */
    static drawBaritoneEspBox = (x, y, z, w, h, red, green, blue, alpha, phase) => {
        Tessellator.pushMatrix();
        GL11.glLineWidth(2.0);
        GlStateManager.func_179129_p(); // disableCullFace
        GlStateManager.func_179147_l(); // enableBlend
        GlStateManager.func_179112_b(770, 771); // blendFunc
        GlStateManager.func_179132_a(false); // depthMask
        GlStateManager.func_179090_x(); // disableTexture2D

        if (phase) {
            GlStateManager.func_179097_i() // disableDepth
        }

        let th = h / 2 + Math.cos((((java.lang.System.nanoTime() / 100000) % 20000) / 20000) * Math.PI * 2) / (2 / h);
        let bh = h / 2 + Math.cos((((java.lang.System.nanoTime() / 100000) % 20000) / 20000) * Math.PI * 2) / -(2 / h);

        const locations = [
            [
                [0, 0, 0],
                [0, h, 0],
            ],
            [
                [w, 0, 0],
                [w, h, 0],
            ],
            [
                [0, 0, w],
                [0, h, w],
            ],
            [
                [w, 0, w],
                [w, h, w],
            ],
            [
                [0, th, 0],
                [w, th, 0],
            ],
            [
                [0, th, 0],
                [0, th, w],
            ],
            [
                [w, th, w],
                [w, th, 0],
            ],
            [
                [w, th, w],
                [0, th, w],
            ],
            [
                [0, bh, 0],
                [w, bh, 0],
            ],
            [
                [0, bh, 0],
                [0, bh, w],
            ],
            [
                [w, bh, w],
                [w, bh, 0],
            ],
            [
                [w, bh, w],
                [0, bh, w],
            ],
        ];

        locations.forEach((loc) => {
            Tessellator.begin(3).colorize(red, green, blue, alpha);

            Tessellator.pos(x + loc[0][0], y + loc[0][1], z + loc[0][2]).tex(0, 0);

            Tessellator.pos(x + loc[1][0], y + loc[1][1], z + loc[1][2]).tex(0, 0);

            Tessellator.draw();
        });

        GlStateManager.func_179089_o(); // enableCull
        GlStateManager.func_179084_k(); // disableBlend
        GlStateManager.func_179132_a(true); // depthMask
        GlStateManager.func_179098_w(); // enableTexture2D
        if (phase) {
            GlStateManager.func_179126_j(); // enableDepth
        }
                
        Tessellator.popMatrix();
    };

    /**
     * Draws a sphere
     * More Info: http://legacy.lwjgl.org/javadoc/org/lwjgl/util/glu/Sphere.html
     * @param {number} x - X Coordinates
     * @param {number} y - Y Coordinates
     * @param {number} z - Z Coordinates
     * @param {number} radius - Radius of the sphere
     * @param {number} slices - How many slices the sphere should have. Figure it out.
     * @param {number} stacks - How many stacks the sphere should have. Figure it out.
     * @param {number} rot1 - Rotation on X axis.
     * @param {number} rot2 - Rotation on Y axis.
     * @param {number} rot3 - Rotation on Z axis.
     * @param {number} r - Box Color Red 0-1
     * @param {number} g - Box Color Green 0-1
     * @param {number} b - Box Color Blue 0-1
     * @param {number} a - Box Color Alpha 0-1
     * @param {boolean} phase - Depth test disabled. True: See through walls
     * @param {boolean} linemode - True: the frame of the sphere is visible. False: the filled sphere is visible.
     */
    static drawSphere = (x, y, z, radius, slices, stacks, rot1, rot2, rot3, r, g, b, a, phase, linemode) => {
        let renderPos = Tessellator.getRenderPos(x, y, z);
        x = renderPos.x;
        y = renderPos.y;
        z = renderPos.z;

        Tessellator.pushMatrix();
        GL11.glLineWidth(2.0);
        GlStateManager.func_179129_p(); // disableCullFace
        GlStateManager.func_179147_l(); // enableBlend
        GlStateManager.func_179112_b(770, 771); // blendFunc
        GlStateManager.func_179132_a(false); // depthMask
        GlStateManager.func_179090_x(); // disableTexture2D

        if (phase) {
            GlStateManager.func_179097_i() // disableDepth
        }
        
        Tessellator.colorize(r, g, b, a);
        Tessellator.translate(x, y, z);
        Tessellator.rotate(rot1, 1, 0, 0);
        Tessellator.rotate(rot2, 0, 0, 1);
        Tessellator.rotate(rot3, 0, 1, 0);

        if (linemode) lineSphere.draw(radius, slices, stacks);
        else regSphere.draw(radius, slices, stacks);

        GlStateManager.func_179089_o(); // enableCull
        GlStateManager.func_179084_k(); // disableBlend
        GlStateManager.func_179132_a(true); // depthMask
        GlStateManager.func_179098_w(); // enableTexture2D
        if (phase) {
            GlStateManager.func_179126_j(); // enableDepth
        }
                
        Tessellator.popMatrix();
    };

    /**
     * Draws a 3D cylinder
     * More Info: http://legacy.lwjgl.org/javadoc/org/lwjgl/util/glu/Cylinder.html
     * @param {number} x - X Coordinates
     * @param {number} y - Y Coordinates
     * @param {number} z - Z Coordinates
     * @param {number} baseRadius - Radius of the bottom of the cylinder.
     * @param {number} topRadius - Radius of the top of the cylinder.
     * @param {number} height - Height of the cylinder.
     * @param {number} slices - Slices in the cylinder. I don't know what this means just figure it out.
     * @param {number} stacks - Stacks in the cylinder. I don't know what this means just figure it out.
     * @param {number} rot1 - Rotation on X axis.
     * @param {number} rot2 - Rotation on Y axis.
     * @param {number} rot3 - Rotation on Z axis.
     * @param {number} r - Box Color Red 0-1
     * @param {number} g - Box Color Green 0-1
     * @param {number} b - Box Color Blue 0-1
     * @param {number} a - Box Color Alpha 0-1
     * @param {boolean} phase - Depth test disabled. True: See through walls
     * @param {boolean} linemode - True: the frame of the cylinder is visible. False: the filled cylinder is visible.
     */
    static drawCyl = (x, y, z, baseRadius, topRadius, height, slices, stacks, rot1, rot2, rot3, r, g, b, a, phase, linemode) => {
        let renderPos = Tessellator.getRenderPos(x, y, z);
        x = renderPos.x;
        y = renderPos.y;
        z = renderPos.z;

        Tessellator.pushMatrix();
        GL11.glLineWidth(2.0);
        GlStateManager.func_179129_p(); // disableCullFace
        GlStateManager.func_179147_l(); // enableBlend
        GlStateManager.func_179112_b(770, 771); // blendFunc
        GlStateManager.func_179132_a(false); // depthMask
        GlStateManager.func_179090_x(); // disableTexture2D

        if (phase) {
            GlStateManager.func_179097_i() // disableDepth
        }

        Tessellator.colorize(r, g, b, a);
        Tessellator.translate(x, y, z);
        Tessellator.rotate(rot1, 1, 0, 0);
        Tessellator.rotate(rot2, 0, 0, 1);
        Tessellator.rotate(rot3, 0, 1, 0);

        if (linemode) lineCylinder.draw(baseRadius, topRadius, height, slices, stacks);
        else regCylinder.draw(baseRadius, topRadius, height, slices, stacks);

        GlStateManager.func_179089_o(); // enableCull
        GlStateManager.func_179084_k(); // disableBlend
        GlStateManager.func_179132_a(true); // depthMask
        GlStateManager.func_179098_w(); // enableTexture2D
        if (phase) {
            GlStateManager.func_179126_j(); // enableDepth
        }
                
        Tessellator.popMatrix();
    };

    /**
     * Draws a flat disk.
     * More Info: http://legacy.lwjgl.org/javadoc/org/lwjgl/util/glu/Disk.html
     * @param {number} x - X Coordinates
     * @param {number} y - Y Coordinates
     * @param {number} z - Z Coordinates
     * @param {number} innerRadius - Radius of the smaller circle inside the disk. If you want it to be filled set to 0.
     * @param {number} outerRadius - Radius of the disk.
     * @param {number} slices - Slices in the disk. I don't know what this means just figure it out.
     * @param {number} loops - I don't know.
     * @param {number} rot1 - Rotation on X axis.
     * @param {number} rot2 - Rotation on Y axis.
     * @param {number} rot3 - Rotation on Z axis.
     * @param {number} r - Box Color Red 0-1
     * @param {number} g - Box Color Green 0-1
     * @param {number} b - Box Color Blue 0-1
     * @param {number} a - Box Color Alpha 0-1
     * @param {boolean} phase - Depth test disabled. True: See through walls
     * @param {boolean} linemode - True: the frame of the disk is visible. False: the filled disk is visible.
     */
    static drawDisk = (x, y, z, innerRadius, outerRadius, slices, loops, rot1, rot2, rot3, r, g, b, a, phase, linemode) => {
        let renderPos = Tessellator.getRenderPos(x, y, z);
        x = renderPos.x;
        y = renderPos.y;
        z = renderPos.z;

        Tessellator.pushMatrix();
        GL11.glLineWidth(2.0);
        GlStateManager.func_179129_p(); // disableCullFace
        GlStateManager.func_179147_l(); // enableBlend
        GlStateManager.func_179112_b(770, 771); // blendFunc
        GlStateManager.func_179132_a(false); // depthMask
        GlStateManager.func_179090_x(); // disableTexture2D

        if (phase) {
            GlStateManager.func_179097_i() // disableDepth
        }

        Tessellator.colorize(r, g, b, a);
        Tessellator.translate(x, y, z);
        Tessellator.rotate(rot1, 1, 0, 0);
        Tessellator.rotate(rot2, 0, 0, 1);
        Tessellator.rotate(rot3, 0, 1, 0);

        if (linemode) lineDisk.draw(innerRadius, outerRadius, slices, loops);
        else regDisk.draw(innerRadius, outerRadius, slices, loops);


        GlStateManager.func_179089_o(); // enableCull
        GlStateManager.func_179084_k(); // disableBlend
        GlStateManager.func_179132_a(true); // depthMask
        GlStateManager.func_179098_w(); // enableTexture2D
        if (phase) {
            GlStateManager.func_179126_j(); // enableDepth
        }
                
        Tessellator.popMatrix();
    };
}
