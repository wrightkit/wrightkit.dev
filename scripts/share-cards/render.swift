import AppKit
import Foundation

let root = URL(fileURLWithPath: #filePath)
	.deletingLastPathComponent()
	.deletingLastPathComponent()
	.deletingLastPathComponent()
let staticDir = root.appendingPathComponent("static")

let ink = NSColor(srgbRed: 0x10 / 255, green: 0x10 / 255, blue: 0x0e / 255, alpha: 1)
let paper = NSColor(srgbRed: 0xf7 / 255, green: 0xf7 / 255, blue: 0xf5 / 255, alpha: 1)
let muted = NSColor(srgbRed: 0xc2 / 255, green: 0xc2 / 255, blue: 0xbc / 255, alpha: 1)
let accent = NSColor(srgbRed: 0xf9 / 255, green: 0x73 / 255, blue: 0x16 / 255, alpha: 1)

func png(width: Int, height: Int, _ draw: () -> Void) -> Data {
	guard
		let rep = NSBitmapImageRep(
			bitmapDataPlanes: nil,
			pixelsWide: width,
			pixelsHigh: height,
			bitsPerSample: 8,
			samplesPerPixel: 4,
			hasAlpha: true,
			isPlanar: false,
			colorSpaceName: .deviceRGB,
			bytesPerRow: 0,
			bitsPerPixel: 0
		)
	else {
		fputs("could not allocate bitmap\n", stderr)
		exit(1)
	}
	rep.size = NSSize(width: width, height: height)
	guard let context = NSGraphicsContext(bitmapImageRep: rep) else {
		fputs("could not make graphics context\n", stderr)
		exit(1)
	}
	NSGraphicsContext.saveGraphicsState()
	NSGraphicsContext.current = context
	draw()
	NSGraphicsContext.restoreGraphicsState()
	guard let data = rep.representation(using: .png, properties: [:]) else {
		fputs("could not encode png\n", stderr)
		exit(1)
	}
	return data
}

func write(_ name: String, _ data: Data) {
	let url = staticDir.appendingPathComponent(name)
	do {
		try data.write(to: url)
	} catch {
		fputs("write \(name) failed: \(error)\n", stderr)
		exit(1)
	}
}

func drawMark(in rect: CGRect) {
	let scale = rect.width / 32
	let stroke = 2.5 * scale
	let outer = NSBezierPath(rect: rect.insetBy(dx: stroke / 2, dy: stroke / 2))
	outer.lineWidth = stroke
	paper.setStroke()
	outer.stroke()
	let inner = 10 * scale
	accent.setFill()
	NSRect(x: rect.midX - inner / 2, y: rect.midY - inner / 2, width: inner, height: inner).fill()
}

func drawText(_ text: String, size: CGFloat, weight: NSFont.Weight, color: NSColor, kern: CGFloat, center: CGPoint) {
	let font = NSFont.systemFont(ofSize: size, weight: weight)
	let attributed = NSAttributedString(
		string: text,
		attributes: [
			.font: font,
			.foregroundColor: color,
			.kern: kern
		]
	)
	let bounds = attributed.size()
	attributed.draw(
		in: NSRect(
			x: center.x - bounds.width / 2,
			y: center.y - bounds.height / 2,
			width: bounds.width,
			height: bounds.height
		)
	)
}

func card(file: String, subtitle: String, subtitleSize: CGFloat) {
	let data = png(width: 1200, height: 630) {
		ink.setFill()
		NSRect(x: 0, y: 0, width: 1200, height: 630).fill()
		let mark: CGFloat = 72
		let titleSize: CGFloat = 76
		let titleHeight = NSFont.systemFont(ofSize: titleSize, weight: .semibold).ascender
			- NSFont.systemFont(ofSize: titleSize, weight: .semibold).descender
		let subHeight = NSFont.systemFont(ofSize: subtitleSize, weight: .medium).ascender
			- NSFont.systemFont(ofSize: subtitleSize, weight: .medium).descender
		let gapAfterMark: CGFloat = 28
		let gapAfterTitle: CGFloat = 18
		let total = mark + gapAfterMark + titleHeight + gapAfterTitle + subHeight
		let bottom = (630 - total) / 2
		drawText(
			subtitle,
			size: subtitleSize,
			weight: .medium,
			color: muted,
			kern: 0,
			center: CGPoint(x: 600, y: bottom + subHeight / 2)
		)
		drawText(
			"WrightKit",
			size: titleSize,
			weight: .semibold,
			color: paper,
			kern: -1.6,
			center: CGPoint(x: 600, y: bottom + subHeight + gapAfterTitle + titleHeight / 2)
		)
		drawMark(
			in: CGRect(
				x: 600 - mark / 2,
				y: bottom + subHeight + gapAfterTitle + titleHeight + gapAfterMark,
				width: mark,
				height: mark
			)
		)
	}
	write(file, data)
}

card(file: "og-en.png", subtitle: "Overwatch Workshop tooling", subtitleSize: 32)
card(file: "og-zh-CN.png", subtitle: "守望先锋地图工坊开发工具", subtitleSize: 36)

let icon = png(width: 180, height: 180) {
	ink.setFill()
	NSRect(x: 0, y: 0, width: 180, height: 180).fill()
	drawMark(in: CGRect(x: 34, y: 34, width: 112, height: 112))
}
write("apple-touch-icon.png", icon)

let favicon = png(width: 32, height: 32) {
	ink.setFill()
	NSRect(x: 0, y: 0, width: 32, height: 32).fill()
	drawMark(in: CGRect(x: 3, y: 3, width: 26, height: 26))
}
write("favicon-32.png", favicon)
