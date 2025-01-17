import {RenderInternals} from '@remotion/renderer';
import {expect, test} from 'bun:test';
import {nodeReader} from '../from-node';
import {parseMedia} from '../parse-media';

test('Should get duration of video', async () => {
	const parsed = await parseMedia(
		RenderInternals.exampleVideos.framer24fps,
		{
			durationInSeconds: true,
			dimensions: true,
		},
		nodeReader,
	);

	expect(parsed.durationInSeconds).toBe(4.167);
	expect(parsed.dimensions).toEqual({width: 1080, height: 1080});
});

test('Should get duration of HEVC video', async () => {
	const parsed = await parseMedia(
		RenderInternals.exampleVideos.iphonehevc,
		{durationInSeconds: true, dimensions: true, fps: true},
		nodeReader,
	);

	expect(parsed.durationInSeconds).toBe(3.4);
	// TODO: Should apply rotation matrix to get the correct dimensions
	expect(parsed.dimensions).toEqual({
		width: 1920,
		height: 1080,
	});
	expect(parsed.fps).toEqual(30);
});
