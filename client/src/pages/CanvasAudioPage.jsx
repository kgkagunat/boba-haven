import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function CanvasAudioPage() {

    const wrapperStyle = {
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        color: "white"
    };

    const canvasStyle = {
        display: "block",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
    };

    const linkStyle = {
        display: 'inline-block',
        padding: '10px 20px',
        margin: '10px',
        backgroundColor: '#222',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px'
    };

    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);

    let audioContext = null;
    let source = null;
    let analyser = null;
    let dataArray = null;
    let isMounted = true;

    useEffect(() => {
        isMounted = true;
        function handleFileChange() {
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            const file = fileInputRef.current.files[0];
            if (file) {
                playAudio(file);
            }
        }

        fileInputRef.current.addEventListener('change', handleFileChange);

        return () => {
            isMounted = false;  // Set the flag to false when unmounting
            // Cleanup event listener on component unmount
            if (fileInputRef.current) {
                fileInputRef.current.removeEventListener('change', handleFileChange);
            }
            if (source) {
                source.stop();
            }
        };
    }, []);

    function playAudio(file) {
        const canvas = canvasRef.current;

        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            if (source) {
                source.stop();
            }
            source = audioContext.createBufferSource();
            analyser = audioContext.createAnalyser();
            audioContext.decodeAudioData(event.target.result, function(buffer) {
                source.buffer = buffer;
                source.connect(analyser);
                analyser.connect(audioContext.destination);
                analyser.fftSize = 4096;
                const bufferLength = analyser.frequencyBinCount;
                dataArray = new Uint8Array(bufferLength);
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                source.start();
                animate();
            });
        };
        fileReader.readAsArrayBuffer(file);
    }
    
    function hsvToRgb(h, s, v) {
        let r, g, b;
        let i = Math.floor(h * 4);
        let f = h * 4 - i; 
        let p = v * (1 - s);
        let q = v * (1 - f * s);
        let t = v * (1 - (1 - f) * s);

        switch (i) {
            case 0:
                [r, g, b] = [255, Math.round(t * 255), Math.round(p * 255)];
                break;
            case 1:
                [r, g, b] = [Math.round(p * 255), Math.round(v * 255), Math.round(t * 255)];
                break;
            case 2:
                [r, g, b] = [Math.round(p * 255), Math.round(q * 255), 255];
                break;
            case 3:
                [r, g, b] = [255, 255, 255];
                break;
        }

        return [r, g, b];
    }
    
    function animate() {
        if (!isMounted) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        requestAnimationFrame(animate);
        analyser.getByteFrequencyData(dataArray);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;
        const spaceBetweenBars = 2;
    
        for (let i = 0; i < dataArray.length; i++) {
            const barHeight = dataArray[i] * 2.10;
            const [r, g, b] = hsvToRgb(i / dataArray.length, 1, 1);
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            let x = centerX + radius * Math.cos((spaceBetweenBars * i) * (Math.PI / 180));
            let y = centerY + radius * Math.sin((spaceBetweenBars * i) * (Math.PI / 180));
            let endX = centerX + (radius + barHeight) * Math.cos((spaceBetweenBars * i) * (Math.PI / 180));
            let endY = centerY + (radius + barHeight) * Math.sin((spaceBetweenBars * i) * (Math.PI / 180));
            drawLine(ctx, x, y, endX, endY);
        }
    }
    
    function drawLine(ctx, startX, startY, endX, endY) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = 3;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.stroke();
        ctx.closePath();
    }

    return (
        <div style={wrapperStyle}>
            <Link to="/" style={linkStyle}>Back to Home</Link>
            <input type="file" ref={fileInputRef} id="audioFile" accept="audio/*" />
            <canvas ref={canvasRef} id="canvas" style={canvasStyle}></canvas>
        </div>
    );
}

export default CanvasAudioPage;
