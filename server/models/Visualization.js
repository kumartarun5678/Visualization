import mongoose from "mongoose";

const visualizationSchema = new mongoose.Schema({
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  year: Number,
  country: String,
  topics: String,
  region: String,
  city: String,
  end_year: String,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  start_year: String,
  impact: String,
  added: { type: Date, default: Date.now },
  published: Date,
  pestle: String,
  source: String,
  title: String,
});

const Visualization = mongoose.model("Visualization", visualizationSchema);

export default Visualization;
