import { Data } from "effect"

export default class SkipGenerateException extends Data.TaggedError("SkipGenerateException") {
}
