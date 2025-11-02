---
title: Document Intelligence System
description: Production RAG Implementation
date: 2025-09-15
---

## The Challenge
The financial industry runs on data, and nearly all of that data comes from documents. These range from federally standardized forms to state-required filings to custom documents formatted however the client chose that day. Some processes involve extracting hundreds to thousands of data points depending on complexity. We needed a way to dramatically speed up this extraction process while maintaining high quality and accuracy.
## My Role
I was tasked with taking a proof-of-concept and fully implementing a production-ready RAG (Retrieval-Augmented Generation) system. The project involved four main phases: indexing documents, storing processed data, and retrieving information on demand.

## Technical Implementation
### Phase 1: Document Indexing
For the initial version, we used Apache Lucene to process and chunk documents for AI ingestion. However, we quickly discovered that document quality was critical—standardized documents were straightforward, but anything outside the norm presented challenges.
The biggest complications came from non-text formats: JPGs, PNGs, and surprisingly, many PDFs. To handle these edge cases, we integrated Tesseract OCR to extract text from image-based files, including documents users submitted as phone camera uploads rather than digital files.
After several rounds of tweaking DPI thresholds and OCR parameters, we achieved a robust chunking system. This chunking strategy is crucial for sending only the most relevant document sections to the LLM, minimizing token usage while maximizing accuracy.

### Phase 2: Data Storage & Configuration
We stored processed chunks in a SQL database with carefully designed relationships to enable efficient retrieval of chunks alongside document metadata (type, upload date, size, etc.).
I implemented a flexible configuration system allowing end users to define AI extraction rules per data point, including:
- Model selection
- Parameters (top_p, temperature)
- Custom prompts for LLM queries

### Phase 3: Processing
After we have successfully indexed the document, and that docuemnt type has defined data point configurations, we move on to the actually data extraction. I created a pretty basic java function that gathers all the data point configs for that type of document and will send all those queries to the LLM one at a time. In the initial phases of this project we explored a couple different ways to do this part: on-shot query with all quries strung together and back and forth question and response style. In both cases, the accuracy of the answers was unsatisfactory to the buisness requirments we were given, even though it does cut down on token costs comared to the single session per datapoint that we are currently running. Each response is also stored in a database for later use.

### Phase 4: Orchestration
The system currently processes documents in scheduled batches throughout the day using Apache Airflow. I constructed the DAG (Directed Acyclic Graph) to orchestrate this entire pipeline. The main features are checks to see if any new docuements uploaded need indexing, and after indexing, if there are any indexed docs that are ready for data extraction. this process can be augmented to look at specific timeframes of document upload for the case when a new document type is intorduced and the business needs a backlog of already uploaded documetns to be processed.

## Results & Future Improvements
The system is now in production, successfully extracting data from diverse document types with high accuracy.
We're currently exploring two major enhancements:
- Vector database migration for semantic search capabilities and improved retrieval accuracy
- Real-time processing at upload time rather than batch processing, enabling faster data access during critical business periods

## Key Takeaways
This project taught me valuable lessons about transforming existing systems to leverage LLMs effectively, the critical importance of data quality in AI pipelines, and the challenges of building production-grade AI systems that handle real-world document variability.
