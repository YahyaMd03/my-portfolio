import {
  SiPython,
  SiPostgresql,
  SiAmazonwebservices,
  SiOpenai,
  SiVercel,
  SiCloudflare,
  SiSupabase,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiPlanetscale,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiGit,
  SiPrometheus,
  SiGrafana,
  SiMongodb,
  SiVuedotjs,
  SiFirebase,
  SiElixir,
} from "react-icons/si";
import { FaBrain, FaDatabase, FaServer, FaRobot, FaChartLine, FaCode, FaTerminal } from "react-icons/fa";
import { IconType } from "react-icons";

// Extended type for bubble view with documentation
export interface TechWithDocs {
  name: string;
  icon: IconType;
  color: string;
  darkColor?: string;
  proficiency: number;
  experience: string;
  bestPractices: string[];
  documentation: { title: string; url: string; description: string }[];
  quickStart: string;
  initSteps?: string[];
  proTips?: string[];
}

// ============================================
// VECTOR DATABASES & EMBEDDINGS
// ============================================

export const pineconeData: TechWithDocs = {
  name: "Pinecone",
  icon: FaDatabase,
  color: "#430098",
  proficiency: 85,
  experience: "2+ years building RAG systems",
  bestPractices: [
    "Use namespace separation for different data sources or environments",
    "Implement proper metadata filtering for efficient querying",
    "Batch upsert operations to optimize write performance",
    "Use sparse-dense hybrid search for better retrieval accuracy",
    "Monitor index size and optimize dimension count (typically 768-1536)",
    "Implement proper error handling and retry logic for API calls",
    "Use serverless indexes for cost-effective scaling",
    "Cache frequently accessed vectors to reduce API calls",
  ],
  documentation: [
    { title: "Pinecone Docs", url: "https://docs.pinecone.io", description: "Official Pinecone documentation" },
    { title: "Vector Database Guide", url: "https://www.pinecone.io/learn/vector-database/", description: "Comprehensive vector database guide" },
    { title: "RAG Tutorial", url: "https://docs.pinecone.io/guides/rag", description: "Building RAG applications with Pinecone" },
    { title: "Best Practices", url: "https://docs.pinecone.io/guides/best-practices", description: "Production best practices" },
  ],
  quickStart: `pip install pinecone-client
from pinecone import Pinecone, ServerlessSpec

pc = Pinecone(api_key="your-api-key")
pc.create_index(
    name="my-index",
    dimension=1536,
    metric="cosine",
    spec=ServerlessSpec(cloud="aws", region="us-east-1")
)`,
  initSteps: [
    "Sign up for Pinecone account and get API key",
    "Install pinecone-client Python package",
    "Create index with appropriate dimension (match embedding model)",
    "Choose metric (cosine, euclidean, or dotproduct)",
    "Select serverless or pod-based deployment",
    "Implement upsert and query operations",
  ],
  proTips: [
    "Use cosine similarity for normalized embeddings, dotproduct for unnormalized",
    "Serverless indexes auto-scale and are perfect for variable workloads",
    "Metadata filtering happens before vector search, making it very fast",
  ],
};

export const weaviateData: TechWithDocs = {
  name: "Weaviate",
  icon: FaDatabase,
  color: "#4CABE4",
  proficiency: 80,
  experience: "1+ year for self-hosted vector search",
  bestPractices: [
    "Use Weaviate Cloud for managed deployments, self-host for control",
    "Implement proper schema design with vectorizers and modules",
    "Use hybrid search combining vector and keyword search",
    "Configure replication factor for high availability",
    "Implement proper backup strategies for production",
    "Use batch imports for large-scale data ingestion",
    "Monitor query performance and optimize shard distribution",
    "Leverage Weaviate's built-in modules (text2vec, qna, etc.)",
  ],
  documentation: [
    { title: "Weaviate Docs", url: "https://weaviate.io/developers/weaviate", description: "Official Weaviate documentation" },
    { title: "Getting Started", url: "https://weaviate.io/developers/weaviate/quickstart", description: "Quick start guide" },
    { title: "Self-Hosting", url: "https://weaviate.io/developers/weaviate/installation", description: "Self-hosting guide" },
    { title: "Weaviate Cloud", url: "https://console.weaviate.cloud", description: "Managed Weaviate service" },
  ],
  quickStart: `# Using Docker
docker run -d \\
  --name weaviate \\
  -p 8080:8080 \\
  -e QUERY_DEFAULTS_LIMIT=25 \\
  -e AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED=true \\
  -e PERSISTENCE_DATA_PATH='/var/lib/weaviate' \\
  semitechnologies/weaviate:latest`,
  initSteps: [
    "Choose between Weaviate Cloud or self-hosted",
    "Set up Docker or Kubernetes deployment",
    "Configure authentication and security",
    "Define schema with classes and properties",
    "Set up vectorizers (OpenAI, Cohere, etc.)",
    "Import data using batch operations",
  ],
  proTips: [
    "Weaviate's hybrid search is excellent for combining semantic and keyword search",
    "Use Weaviate's GraphQL API for complex queries",
    "Built-in modules eliminate need for external embedding services",
  ],
};

export const qdrantData: TechWithDocs = {
  name: "Qdrant",
  icon: FaDatabase,
  color: "#FF6B35",
  proficiency: 75,
  experience: "1+ year for open-source vector search",
  bestPractices: [
    "Use Qdrant Cloud for managed service or self-host for control",
    "Optimize payload indexing for fast metadata filtering",
    "Use HNSW index for approximate nearest neighbor search",
    "Implement proper sharding for large-scale deployments",
    "Configure replication for high availability",
    "Use batch operations for efficient data ingestion",
    "Monitor memory usage and optimize collection settings",
    "Leverage Qdrant's filtering capabilities for hybrid search",
  ],
  documentation: [
    { title: "Qdrant Docs", url: "https://qdrant.tech/documentation/", description: "Official Qdrant documentation" },
    { title: "Quick Start", url: "https://qdrant.tech/documentation/quick-start/", description: "Getting started guide" },
    { title: "Qdrant Cloud", url: "https://cloud.qdrant.io", description: "Managed Qdrant service" },
    { title: "Python Client", url: "https://qdrant.github.io/qdrant-client/", description: "Python client documentation" },
  ],
  quickStart: `# Using Docker
docker pull qdrant/qdrant
docker run -p 6333:6333 qdrant/qdrant

# Python client
pip install qdrant-client
from qdrant_client import QdrantClient
client = QdrantClient(host="localhost", port=6333)`,
  initSteps: [
    "Install Qdrant (Docker, Kubernetes, or binary)",
    "Create collection with vector size and distance metric",
    "Configure HNSW parameters for performance",
    "Set up payload schema for metadata",
    "Import vectors using batch upsert",
    "Implement query and search operations",
  ],
  proTips: [
    "Qdrant is excellent for self-hosted deployments with full control",
    "HNSW index provides great balance of speed and accuracy",
    "Payload filtering is very fast and supports complex queries",
  ],
};

export const pgvectorData: TechWithDocs = {
  name: "pgvector",
  icon: SiPostgresql,
  color: "#4169E1",
  proficiency: 85,
  experience: "2+ years with PostgreSQL vector search",
  bestPractices: [
    "Use HNSW index for approximate nearest neighbor search",
    "Choose appropriate distance metric (L2, inner product, or cosine)",
    "Optimize index parameters (m, ef_construction) for your use case",
    "Use IVFFlat index for faster index creation on large datasets",
    "Implement proper connection pooling for concurrent queries",
    "Monitor query performance with EXPLAIN ANALYZE",
    "Use JSONB columns for metadata alongside vector columns",
    "Consider partitioning large vector tables by time or category",
  ],
  documentation: [
    { title: "pgvector GitHub", url: "https://github.com/pgvector/pgvector", description: "Official pgvector repository" },
    { title: "Installation Guide", url: "https://github.com/pgvector/pgvector#installation", description: "Installation instructions" },
    { title: "Usage Examples", url: "https://github.com/pgvector/pgvector#usage", description: "Code examples and patterns" },
    { title: "Supabase pgvector", url: "https://supabase.com/docs/guides/ai/vector-columns", description: "Using pgvector with Supabase" },
  ],
  quickStart: `# Install extension
CREATE EXTENSION vector;

# Create table with vector column
CREATE TABLE items (
  id bigserial PRIMARY KEY,
  embedding vector(1536),
  metadata jsonb
);

# Create HNSW index
CREATE INDEX ON items USING hnsw (embedding vector_cosine_ops);`,
  initSteps: [
    "Install pgvector extension in PostgreSQL",
    "Create table with vector column (specify dimension)",
    "Choose index type (HNSW for accuracy, IVFFlat for speed)",
    "Insert vectors using array format",
    "Query using distance operators (<->, <#>, <=>)",
    "Optimize index parameters based on data size",
  ],
  proTips: [
    "pgvector is perfect when you already use PostgreSQL - no separate database needed",
    "HNSW index provides excellent accuracy but slower index creation",
    "Combine with PostgreSQL's full-text search for hybrid search",
  ],
};

export const chromaData: TechWithDocs = {
  name: "Chroma",
  icon: FaDatabase,
  color: "#FFD700",
  proficiency: 70,
  experience: "1+ year for embedded vector databases",
  bestPractices: [
    "Use Chroma for simple, embedded vector database needs",
    "Implement proper persistence for production deployments",
    "Use collection metadata for organizing different data types",
    "Batch operations for efficient data ingestion",
    "Monitor memory usage for in-memory deployments",
    "Use Chroma's query API for flexible search patterns",
    "Implement proper error handling for production use",
    "Consider Chroma Cloud for managed deployments",
  ],
  documentation: [
    { title: "Chroma Docs", url: "https://docs.trychroma.com", description: "Official Chroma documentation" },
    { title: "Getting Started", url: "https://docs.trychroma.com/getting-started", description: "Quick start guide" },
    { title: "Python Client", url: "https://docs.trychroma.com/usage-guide", description: "Python usage guide" },
    { title: "Chroma Cloud", url: "https://www.trychroma.com/cloud", description: "Managed Chroma service" },
  ],
  quickStart: `pip install chromadb
import chromadb

client = chromadb.Client()
collection = client.create_collection("my_collection")
collection.add(
    embeddings=[[0.1, 0.2, 0.3]],
    documents=["Document text"],
    ids=["id1"]
)`,
  initSteps: [
    "Install chromadb Python package",
    "Create or connect to Chroma client",
    "Create collection with optional metadata",
    "Add documents with embeddings or use Chroma's embedding functions",
    "Query collection using similarity search",
    "Configure persistence for production",
  ],
  proTips: [
    "Chroma is great for prototyping and simple use cases",
    "Built-in embedding functions make it easy to get started",
    "Consider other options for large-scale production workloads",
  ],
};

// ============================================
// RAG FRAMEWORKS
// ============================================

export const langchainData: TechWithDocs = {
  name: "LangChain",
  icon: FaBrain,
  color: "#00C853",
  proficiency: 88,
  experience: "2+ years building RAG applications",
  bestPractices: [
    "Use LangChain for complex RAG pipelines with multiple steps",
    "Implement proper prompt templates with variables",
    "Use chain composition for modular, reusable components",
    "Implement proper error handling and retry logic",
    "Use LangSmith for observability and debugging",
    "Optimize chunking strategies for your document types",
    "Implement proper memory management for conversation chains",
    "Use async operations for better performance",
  ],
  documentation: [
    { title: "LangChain Docs", url: "https://python.langchain.com", description: "Official LangChain documentation" },
    { title: "RAG Tutorial", url: "https://python.langchain.com/docs/use_cases/question_answering/", description: "Building RAG applications" },
    { title: "LangSmith", url: "https://smith.langchain.com", description: "Observability platform" },
    { title: "LangGraph", url: "https://langchain-ai.github.io/langgraph/", description: "Stateful multi-actor applications" },
  ],
  quickStart: `pip install langchain langchain-openai langchain-community
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA

llm = ChatOpenAI(model="gpt-4")
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever()
)`,
  initSteps: [
    "Install LangChain and required integrations",
    "Set up LLM provider (OpenAI, Anthropic, etc.)",
    "Create document loaders for your data sources",
    "Implement text splitting and chunking",
    "Set up vector store and embeddings",
    "Create retrieval chain with RAG",
    "Add memory for conversational applications",
  ],
  proTips: [
    "LangChain is powerful but can be complex - use LangGraph for stateful workflows",
    "LangSmith is invaluable for debugging and optimizing chains",
    "Consider simpler alternatives (LlamaIndex) for straightforward RAG",
  ],
};

export const llamaindexData: TechWithDocs = {
  name: "LlamaIndex",
  icon: FaBrain,
  color: "#FF6B6B",
  proficiency: 85,
  experience: "2+ years for data-augmented LLM apps",
  bestPractices: [
    "Use LlamaIndex for straightforward RAG applications",
    "Choose appropriate index type (vector, tree, keyword, etc.)",
    "Implement proper document parsing and chunking",
    "Use query engines for different query types",
    "Implement proper error handling and retry logic",
    "Use LlamaCloud for managed data ingestion",
    "Optimize chunk size and overlap for your use case",
    "Leverage LlamaIndex's built-in evaluation tools",
  ],
  documentation: [
    { title: "LlamaIndex Docs", url: "https://docs.llamaindex.ai", description: "Official LlamaIndex documentation" },
    { title: "Getting Started", url: "https://docs.llamaindex.ai/en/stable/getting_started/", description: "Quick start guide" },
    { title: "RAG Guide", url: "https://docs.llamaindex.ai/en/stable/understanding/rag/", description: "RAG implementation guide" },
    { title: "LlamaCloud", url: "https://cloud.llamaindex.ai", description: "Managed LlamaIndex service" },
  ],
  quickStart: `pip install llama-index
from llama_index import VectorStoreIndex, SimpleDirectoryReader

documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
response = query_engine.query("Your question")`,
  initSteps: [
    "Install llama-index package",
    "Load documents using appropriate readers",
    "Create index (vector, tree, keyword, etc.)",
    "Set up query engine with desired parameters",
    "Implement query and response handling",
    "Add evaluation for quality assurance",
  ],
  proTips: [
    "LlamaIndex is simpler than LangChain for basic RAG use cases",
    "Tree index is great for hierarchical document structures",
    "Use LlamaIndex's evaluation framework to measure RAG quality",
  ],
};

// ============================================
// SERVERLESS & SCALING
// ============================================

export const vercelEdgeData: TechWithDocs = {
  name: "Vercel Edge Functions",
  icon: SiVercel,
  color: "#000000",
  darkColor: "#ffffff",
  proficiency: 90,
  experience: "2+ years building edge applications",
  bestPractices: [
    "Use Edge Functions for low-latency, globally distributed functions",
    "Keep functions lightweight - they run at the edge",
    "Use Edge Config for fast, global configuration",
    "Implement proper caching strategies with Edge Cache",
    "Use streaming responses for better perceived performance",
    "Monitor function execution time and optimize",
    "Use environment variables for secrets management",
    "Implement proper error handling and logging",
  ],
  documentation: [
    { title: "Edge Functions Docs", url: "https://vercel.com/docs/functions/edge-functions", description: "Official Edge Functions documentation" },
    { title: "Edge Runtime", url: "https://vercel.com/docs/functions/runtimes/edge", description: "Edge runtime API reference" },
    { title: "Edge Config", url: "https://vercel.com/docs/storage/edge-config", description: "Global configuration storage" },
    { title: "Examples", url: "https://github.com/vercel/examples/tree/main/edge-functions", description: "Edge function examples" },
  ],
  quickStart: `// app/api/hello/route.ts
export const runtime = 'edge'

export async function GET(request: Request) {
  return new Response(
    JSON.stringify({ message: 'Hello from Edge!' }),
    {
      headers: { 'content-type': 'application/json' },
    }
  )
}`,
  initSteps: [
    "Create API route in app/api directory",
    "Set runtime to 'edge' in route handler",
    "Use Edge Runtime compatible APIs only",
    "Deploy to Vercel for automatic edge distribution",
    "Configure Edge Config if needed",
    "Monitor performance in Vercel dashboard",
  ],
  proTips: [
    "Edge Functions have limited runtime APIs - check compatibility",
    "Perfect for AI API proxies and authentication",
    "Use Edge Middleware for request interception",
  ],
};

export const awsLambdaData: TechWithDocs = {
  name: "AWS Lambda",
  icon: SiAmazonwebservices,
  color: "#FF9900",
  proficiency: 85,
  experience: "3+ years serverless architecture",
  bestPractices: [
    "Keep functions small and focused on single responsibility",
    "Use Lambda Layers for shared dependencies",
    "Implement proper error handling and dead letter queues",
    "Use environment variables for configuration",
    "Optimize cold start times with provisioned concurrency",
    "Implement proper logging with CloudWatch",
    "Use Lambda@Edge for edge computing needs",
    "Monitor costs and optimize memory allocation",
  ],
  documentation: [
    { title: "Lambda Docs", url: "https://docs.aws.amazon.com/lambda/", description: "Official AWS Lambda documentation" },
    { title: "Best Practices", url: "https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html", description: "Lambda best practices guide" },
    { title: "Lambda@Edge", url: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html", description: "Edge computing with Lambda" },
    { title: "Serverless Framework", url: "https://www.serverless.com/framework/docs", description: "Serverless deployment framework" },
  ],
  quickStart: `# Using AWS CLI
aws lambda create-function \\
  --function-name my-function \\
  --runtime python3.11 \\
  --role arn:aws:iam::account:role/lambda-role \\
  --handler index.handler \\
  --zip-file fileb://function.zip`,
  initSteps: [
    "Create IAM role with Lambda execution permissions",
    "Write function code in supported runtime",
    "Package function with dependencies",
    "Create Lambda function via console or CLI",
    "Configure triggers (API Gateway, S3, etc.)",
    "Set up CloudWatch for monitoring",
    "Configure environment variables and secrets",
  ],
  proTips: [
    "Use Lambda Layers to reduce deployment package size",
    "Provisioned concurrency eliminates cold starts for critical functions",
    "Lambda@Edge is great for request/response manipulation at CloudFront",
  ],
};

export const cloudflareWorkersData: TechWithDocs = {
  name: "Cloudflare Workers",
  icon: SiCloudflare,
  color: "#F38020",
  proficiency: 80,
  experience: "1+ year for edge computing",
  bestPractices: [
    "Use Workers for globally distributed, low-latency functions",
    "Leverage Cloudflare's edge network for optimal performance",
    "Use Durable Objects for stateful edge applications",
    "Implement proper caching with Cloudflare Cache API",
    "Use Workers KV for fast, global key-value storage",
    "Monitor CPU time limits and optimize accordingly",
    "Use R2 for object storage at the edge",
    "Implement proper error handling and logging",
  ],
  documentation: [
    { title: "Workers Docs", url: "https://developers.cloudflare.com/workers/", description: "Official Workers documentation" },
    { title: "Getting Started", url: "https://developers.cloudflare.com/workers/get-started/guide/", description: "Quick start guide" },
    { title: "Durable Objects", url: "https://developers.cloudflare.com/durable-objects/", description: "Stateful edge computing" },
    { title: "Workers KV", url: "https://developers.cloudflare.com/kv/", description: "Global key-value storage" },
  ],
  quickStart: `# Install Wrangler CLI
npm install -g wrangler

# Create worker
wrangler init my-worker

# Deploy
wrangler deploy`,
  initSteps: [
    "Install Wrangler CLI tool",
    "Create new Worker project",
    "Write Worker code using Cloudflare APIs",
    "Configure wrangler.toml with settings",
    "Test locally with wrangler dev",
    "Deploy to Cloudflare edge network",
    "Set up Workers KV or Durable Objects if needed",
  ],
  proTips: [
    "Workers have excellent performance and global distribution",
    "Durable Objects enable stateful applications at the edge",
    "Workers KV is perfect for configuration and small data",
  ],
};

export const supabaseEdgeData: TechWithDocs = {
  name: "Supabase Edge Functions",
  icon: SiSupabase,
  color: "#3ECF8E",
  proficiency: 75,
  experience: "1+ year with Supabase serverless",
  bestPractices: [
    "Use Deno runtime for TypeScript-first development",
    "Leverage Supabase client libraries for database access",
    "Implement proper authentication with Supabase Auth",
    "Use environment variables for configuration",
    "Implement proper error handling and logging",
    "Use Supabase Realtime for real-time features",
    "Optimize function execution time",
    "Monitor usage and costs",
  ],
  documentation: [
    { title: "Edge Functions Docs", url: "https://supabase.com/docs/guides/functions", description: "Official Edge Functions documentation" },
    { title: "Getting Started", url: "https://supabase.com/docs/guides/functions/quickstart", description: "Quick start guide" },
    { title: "Deno Runtime", url: "https://supabase.com/docs/guides/functions/runtimes/deno", description: "Deno runtime reference" },
    { title: "Examples", url: "https://github.com/supabase/supabase/tree/master/examples/edge-functions", description: "Edge function examples" },
  ],
  quickStart: `# Install Supabase CLI
npm install -g supabase

# Create function
supabase functions new my-function

# Deploy
supabase functions deploy my-function`,
  initSteps: [
    "Install Supabase CLI",
    "Initialize Supabase project",
    "Create new Edge Function",
    "Write function code in Deno/TypeScript",
    "Use Supabase client for database access",
    "Test locally with supabase functions serve",
    "Deploy to Supabase cloud",
  ],
  proTips: [
    "Edge Functions use Deno, not Node.js - check API compatibility",
    "Perfect for integrating with Supabase database and auth",
    "Use Supabase's built-in integrations for external services",
  ],
};

// ============================================
// DATABASE POOLING & OPTIMIZATION
// ============================================

export const pgbouncerData: TechWithDocs = {
  name: "PgBouncer",
  icon: SiPostgresql,
  color: "#336791",
  proficiency: 85,
  experience: "3+ years optimizing PostgreSQL connections",
  bestPractices: [
    "Use transaction pooling mode for most applications",
    "Configure appropriate pool sizes based on workload",
    "Set max_client_conn to handle peak connections",
    "Use default_pool_size for connection distribution",
    "Implement proper authentication with user mapping",
    "Monitor pool statistics and connection usage",
    "Use PgBouncer for connection pooling, not query caching",
    "Configure proper timeout settings",
  ],
  documentation: [
    { title: "PgBouncer Docs", url: "https://www.pgbouncer.org/usage.html", description: "Official PgBouncer documentation" },
    { title: "Configuration", url: "https://www.pgbouncer.org/config.html", description: "Configuration reference" },
    { title: "Pooling Modes", url: "https://www.pgbouncer.org/features.html", description: "Understanding pooling modes" },
    { title: "Best Practices", url: "https://www.pgbouncer.org/faq.html", description: "Common questions and best practices" },
  ],
  quickStart: `# Install PgBouncer
apt-get install pgbouncer

# Configure /etc/pgbouncer/pgbouncer.ini
[databases]
mydb = host=localhost port=5432 dbname=mydb

[pgbouncer]
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 25`,
  initSteps: [
    "Install PgBouncer package",
    "Configure database connections in pgbouncer.ini",
    "Set pooling mode (session, transaction, or statement)",
    "Configure pool sizes and connection limits",
    "Set up authentication (userlist.txt or auth_query)",
    "Start PgBouncer service",
    "Update application connection strings to use PgBouncer port",
  ],
  proTips: [
    "Transaction pooling is best for most web applications",
    "PgBouncer reduces connection overhead significantly",
    "Use with serverless functions to manage connection limits",
  ],
};

export const neonData: TechWithDocs = {
  name: "Neon",
  icon: SiPostgresql,
  color: "#00E5FF",
  proficiency: 80,
  experience: "1+ year with serverless Postgres",
  bestPractices: [
    "Use Neon for serverless PostgreSQL with auto-scaling",
    "Leverage branching for database versioning and testing",
    "Use connection pooling for serverless functions",
    "Implement proper connection string management",
    "Monitor usage and optimize query performance",
    "Use Neon's built-in observability tools",
    "Implement proper backup and restore strategies",
    "Take advantage of Neon's compute scaling",
  ],
  documentation: [
    { title: "Neon Docs", url: "https://neon.tech/docs", description: "Official Neon documentation" },
    { title: "Getting Started", url: "https://neon.tech/docs/get-started-with-neon", description: "Quick start guide" },
    { title: "Branching", url: "https://neon.tech/docs/guides/branching", description: "Database branching guide" },
    { title: "Connection Pooling", url: "https://neon.tech/docs/connect/connection-pooling", description: "Connection pooling guide" },
  ],
  quickStart: `# Install Neon CLI
npm install -g neonctl

# Create project
neonctl projects create --name my-project

# Get connection string
neonctl connection-string my-project`,
  initSteps: [
    "Sign up for Neon account",
    "Create new project",
    "Get connection string from dashboard",
    "Use connection pooling for serverless functions",
    "Set up branching for development workflow",
    "Configure environment variables",
    "Deploy and monitor",
  ],
  proTips: [
    "Neon's branching is excellent for database versioning",
    "Auto-scaling compute eliminates manual capacity planning",
    "Built-in connection pooling works great with serverless",
  ],
};

export const planetscaleData: TechWithDocs = {
  name: "PlanetScale",
  icon: SiPlanetscale,
  color: "#000000",
  darkColor: "#ffffff",
  proficiency: 75,
  experience: "1+ year with serverless MySQL",
  bestPractices: [
    "Use PlanetScale for serverless MySQL with branching",
    "Leverage branching for zero-downtime schema changes",
    "Use connection pooling for serverless functions",
    "Implement proper query optimization",
    "Use PlanetScale's Insights for query analysis",
    "Take advantage of non-blocking schema migrations",
    "Monitor usage and optimize accordingly",
    "Use read replicas for scaling read operations",
  ],
  documentation: [
    { title: "PlanetScale Docs", url: "https://planetscale.com/docs", description: "Official PlanetScale documentation" },
    { title: "Getting Started", url: "https://planetscale.com/docs/tutorials/planetscale-quick-start-guide", description: "Quick start guide" },
    { title: "Branching", url: "https://planetscale.com/docs/concepts/branching", description: "Database branching guide" },
    { title: "Connection Pooling", url: "https://planetscale.com/docs/concepts/connection-pooling", description: "Connection pooling guide" },
  ],
  quickStart: `# Install PlanetScale CLI
brew install planetscale/tap/pscale

# Login
pscale auth login

# Create database
pscale database create my-db`,
  initSteps: [
    "Sign up for PlanetScale account",
    "Install PlanetScale CLI",
    "Create database and branch",
    "Get connection string",
    "Use connection pooling for serverless",
    "Set up schema migrations",
    "Deploy and monitor",
  ],
  proTips: [
    "PlanetScale's branching enables zero-downtime schema changes",
    "Serverless scaling eliminates capacity planning",
    "Great for applications that need MySQL compatibility",
  ],
};

// ============================================
// DATABASE OPTIMIZATIONS
// ============================================

export const postgresOptimizationData: TechWithDocs = {
  name: "PostgreSQL Optimization",
  icon: SiPostgresql,
  color: "#336791",
  proficiency: 90,
  experience: "4+ years optimizing PostgreSQL",
  bestPractices: [
    "Use GIN indexes for full-text search and array operations",
    "Leverage MVCC for concurrent read/write operations",
    "Optimize JSONB operations with proper indexing",
    "Use EXPLAIN ANALYZE to understand query plans",
    "Implement proper connection pooling (PgBouncer)",
    "Configure appropriate work_mem and shared_buffers",
    "Use partial indexes for filtered queries",
    "Monitor and optimize VACUUM operations",
  ],
  documentation: [
    { title: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/current/", description: "Official PostgreSQL documentation" },
    { title: "Index Types", url: "https://www.postgresql.org/docs/current/indexes-types.html", description: "PostgreSQL index types" },
    { title: "JSONB Guide", url: "https://www.postgresql.org/docs/current/datatype-json.html", description: "JSONB data type guide" },
    { title: "Performance Tuning", url: "https://www.postgresql.org/docs/current/performance-tips.html", description: "Performance optimization guide" },
  ],
  quickStart: `# GIN Index for full-text search
CREATE INDEX idx_gin_text ON documents USING gin(to_tsvector('english', content));

# GIN Index for JSONB
CREATE INDEX idx_gin_jsonb ON data USING gin(jsonb_column);

# JSONB query optimization
SELECT * FROM data WHERE jsonb_column @> '{"key": "value"}'::jsonb;`,
  initSteps: [
    "Analyze query patterns with EXPLAIN ANALYZE",
    "Create appropriate indexes (B-tree, GIN, GiST, etc.)",
    "Optimize JSONB queries with GIN indexes",
    "Configure PostgreSQL parameters (work_mem, shared_buffers)",
    "Implement connection pooling",
    "Set up monitoring and query analysis",
    "Regular VACUUM and ANALYZE operations",
  ],
  proTips: [
    "GIN indexes are perfect for full-text search and JSONB containment",
    "MVCC enables excellent concurrency without locking",
    "JSONB with GIN indexes provides flexible schema with good performance",
  ],
};

export const mvccData: TechWithDocs = {
  name: "MVCC (Multi-Version Concurrency Control)",
  icon: FaDatabase,
  color: "#336791",
  proficiency: 85,
  experience: "3+ years understanding database concurrency",
  bestPractices: [
    "Understand how MVCC enables concurrent read/write operations",
    "Monitor transaction ID wraparound and prevent issues",
    "Use appropriate isolation levels for your use case",
    "Implement proper VACUUM strategies to prevent bloat",
    "Understand snapshot isolation and its implications",
    "Use row-level locking when needed",
    "Monitor long-running transactions",
    "Configure autovacuum appropriately",
  ],
  documentation: [
    { title: "PostgreSQL MVCC", url: "https://www.postgresql.org/docs/current/mvcc.html", description: "PostgreSQL MVCC documentation" },
    { title: "Transaction Isolation", url: "https://www.postgresql.org/docs/current/transaction-iso.html", description: "Isolation levels guide" },
    { title: "VACUUM Guide", url: "https://www.postgresql.org/docs/current/sql-vacuum.html", description: "VACUUM operation guide" },
    { title: "Concurrency Control", url: "https://www.postgresql.org/docs/current/concurrency-control.html", description: "Concurrency control concepts" },
  ],
  quickStart: `# Check transaction age
SELECT datname, age(datfrozenxid) FROM pg_database;

# Manual VACUUM
VACUUM ANALYZE my_table;

# Configure autovacuum
ALTER TABLE my_table SET (autovacuum_vacuum_scale_factor = 0.1);`,
  initSteps: [
    "Understand MVCC concepts and snapshot isolation",
    "Configure appropriate isolation levels",
    "Set up autovacuum for regular maintenance",
    "Monitor transaction age and wraparound risk",
    "Implement proper VACUUM strategies",
    "Monitor long-running transactions",
    "Optimize for your concurrency patterns",
  ],
  proTips: [
    "MVCC enables excellent read concurrency without blocking",
    "Transaction ID wraparound is critical to monitor",
    "Autovacuum is essential for maintaining performance",
  ],
};

export const jsonbOptimizationData: TechWithDocs = {
  name: "JSONB Optimization",
  icon: SiPostgresql,
  color: "#336791",
  proficiency: 88,
  experience: "3+ years with JSONB in PostgreSQL",
  bestPractices: [
    "Use GIN indexes for JSONB containment queries (@>, ?)",
    "Use GIN path_ops for faster containment checks",
    "Extract frequently queried fields to regular columns",
    "Use jsonb_path_ops for path-based queries",
    "Implement proper indexing strategies for JSONB",
    "Use JSONB for flexible schema, not as replacement for proper schema",
    "Monitor JSONB query performance with EXPLAIN",
    "Consider partial indexes on JSONB expressions",
  ],
  documentation: [
    { title: "JSONB Docs", url: "https://www.postgresql.org/docs/current/datatype-json.html", description: "PostgreSQL JSONB documentation" },
    { title: "JSONB Indexing", url: "https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING", description: "JSONB indexing guide" },
    { title: "JSON Functions", url: "https://www.postgresql.org/docs/current/functions-json.html", description: "JSON/JSONB functions" },
    { title: "JSONB Performance", url: "https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING", description: "JSONB performance tips" },
  ],
  quickStart: `# Create GIN index for JSONB
CREATE INDEX idx_gin_jsonb ON table_name USING gin(jsonb_column);

# Create GIN path_ops index (faster for containment)
CREATE INDEX idx_gin_path_ops ON table_name USING gin(jsonb_column jsonb_path_ops);

# Query with containment
SELECT * FROM table_name WHERE jsonb_column @> '{"key": "value"}'::jsonb;`,
  initSteps: [
    "Design JSONB schema for your use case",
    "Identify frequently queried paths",
    "Create appropriate GIN indexes",
    "Use containment operators (@>, ?) for queries",
    "Extract hot paths to regular columns if needed",
    "Monitor query performance",
    "Optimize based on access patterns",
  ],
  proTips: [
    "GIN indexes make JSONB queries very fast",
    "path_ops indexes are smaller and faster for containment",
    "JSONB is great for flexible schema, but don't overuse it",
  ],
};

// ============================================
// AI APIS & MODEL SERVING
// ============================================

export const openaiData: TechWithDocs = {
  name: "OpenAI API",
  icon: SiOpenai,
  color: "#10A37F",
  proficiency: 90,
  experience: "2+ years building AI applications",
  bestPractices: [
    "Implement proper rate limiting and retry logic",
    "Use streaming for better user experience",
    "Optimize prompt engineering for cost and quality",
    "Cache responses when appropriate",
    "Monitor token usage and costs",
    "Use appropriate models for your use case (GPT-4 vs GPT-3.5)",
    "Implement proper error handling for API failures",
    "Use function calling for structured outputs",
  ],
  documentation: [
    { title: "OpenAI API Docs", url: "https://platform.openai.com/docs", description: "Official OpenAI API documentation" },
    { title: "Embeddings Guide", url: "https://platform.openai.com/docs/guides/embeddings", description: "Using embeddings" },
    { title: "Function Calling", url: "https://platform.openai.com/docs/guides/function-calling", description: "Function calling guide" },
    { title: "Best Practices", url: "https://platform.openai.com/docs/guides/production-best-practices", description: "Production best practices" },
  ],
  quickStart: `pip install openai
from openai import OpenAI

client = OpenAI(api_key="your-api-key")
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)`,
  initSteps: [
    "Sign up for OpenAI account and get API key",
    "Install OpenAI Python or Node.js SDK",
    "Set up API key in environment variables",
    "Choose appropriate model for your use case",
    "Implement prompt engineering",
    "Add error handling and retry logic",
    "Monitor usage and costs",
  ],
  proTips: [
    "Use GPT-3.5-turbo for most use cases to save costs",
    "Streaming improves perceived performance significantly",
    "Function calling enables structured outputs and tool use",
  ],
};

export const anthropicData: TechWithDocs = {
  name: "Anthropic Claude",
  icon: FaRobot,
  color: "#D97757",
  proficiency: 85,
  experience: "1+ year with Claude API",
  bestPractices: [
    "Use Claude for long context windows and complex reasoning",
    "Implement proper streaming for better UX",
    "Leverage Claude's tool use capabilities",
    "Optimize prompts for Claude's strengths",
    "Monitor token usage and costs",
    "Use appropriate model versions (Claude 3.5 Sonnet, Opus, etc.)",
    "Implement proper error handling",
    "Use system prompts effectively",
  ],
  documentation: [
    { title: "Anthropic Docs", url: "https://docs.anthropic.com", description: "Official Anthropic documentation" },
    { title: "Getting Started", url: "https://docs.anthropic.com/claude/docs/getting-started-with-the-api", description: "Quick start guide" },
    { title: "Tool Use", url: "https://docs.anthropic.com/claude/docs/tool-use", description: "Tool use guide" },
    { title: "Best Practices", url: "https://docs.anthropic.com/claude/docs/prompt-engineering", description: "Prompt engineering guide" },
  ],
  quickStart: `pip install anthropic
from anthropic import Anthropic

client = Anthropic(api_key="your-api-key")
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}]
)`,
  initSteps: [
    "Sign up for Anthropic account and get API key",
    "Install Anthropic Python or TypeScript SDK",
    "Set up API key in environment variables",
    "Choose appropriate Claude model",
    "Implement prompt engineering",
    "Add error handling and retry logic",
    "Monitor usage and costs",
  ],
  proTips: [
    "Claude excels at long context and complex reasoning tasks",
    "Tool use enables structured outputs and function calling",
    "Claude 3.5 Sonnet offers great balance of quality and cost",
  ],
};

// ============================================
// FRONTEND FRAMEWORKS
// ============================================

export const reactData: TechWithDocs = {
  name: "React",
  icon: SiReact,
  color: "#61DAFB",
  proficiency: 95,
  experience: "5+ years building React applications",
  bestPractices: [
    "Use functional components with hooks instead of class components",
    "Implement proper memoization with useMemo and useCallback to prevent unnecessary re-renders",
    "Split components into smaller, reusable pieces following single responsibility principle",
    "Use React.memo for expensive components that receive stable props",
    "Implement proper error boundaries to catch and handle errors gracefully",
    "Use custom hooks to extract and reuse stateful logic",
    "Optimize bundle size with code splitting and lazy loading",
    "Follow React's rules of hooks - only call hooks at the top level",
    "Use TypeScript for type safety and better developer experience",
    "Implement proper state management (Context API, Zustand, or Redux) for global state",
  ],
  documentation: [
    { title: "React Docs", url: "https://react.dev", description: "Official React documentation" },
    { title: "Hooks Reference", url: "https://react.dev/reference/react", description: "Complete hooks API reference" },
    { title: "Best Practices", url: "https://react.dev/learn/thinking-in-react", description: "Thinking in React guide" },
    { title: "Performance", url: "https://react.dev/learn/render-and-commit", description: "React rendering optimization" },
  ],
  quickStart: `npx create-react-app my-app
cd my-app
npm start`,
  initSteps: [
    "Install Node.js (v18+ recommended)",
    "Create new React app with create-react-app or Vite",
    "Set up project structure and folder organization",
    "Install essential dependencies (React Router, etc.)",
    "Configure ESLint and Prettier for code quality",
    "Set up TypeScript if using (recommended)",
    "Start development server",
  ],
  proTips: [
    "Use React DevTools Profiler to identify performance bottlenecks",
    "Prefer composition over inheritance - use children prop and render props",
    "Keep state as close to where it's used as possible",
    "Use React Query or SWR for server state management",
    "Implement Suspense boundaries for better loading states",
  ],
};

export const nextjsData: TechWithDocs = {
  name: "Next.js",
  icon: SiNextdotjs,
  color: "#000000",
  darkColor: "#ffffff",
  proficiency: 92,
  experience: "4+ years building Next.js applications",
  bestPractices: [
    "Use App Router (Next.js 13+) for new projects with server components",
    "Implement proper data fetching with server components and async components",
    "Use route handlers (app/api) for API endpoints instead of pages/api",
    "Optimize images with next/image component for automatic optimization",
    "Implement proper caching strategies (revalidate, cache tags)",
    "Use middleware for authentication and request interception",
    "Leverage static generation (SSG) and incremental static regeneration (ISR)",
    "Implement proper error handling with error.tsx and not-found.tsx",
    "Use streaming and Suspense for better perceived performance",
    "Optimize bundle size with dynamic imports and code splitting",
  ],
  documentation: [
    { title: "Next.js Docs", url: "https://nextjs.org/docs", description: "Official Next.js documentation" },
    { title: "App Router", url: "https://nextjs.org/docs/app", description: "App Router guide" },
    { title: "Data Fetching", url: "https://nextjs.org/docs/app/building-your-application/data-fetching", description: "Data fetching patterns" },
    { title: "Deployment", url: "https://nextjs.org/docs/deployment", description: "Deployment guide" },
  ],
  quickStart: `npx create-next-app@latest my-app
cd my-app
npm run dev`,
  initSteps: [
    "Install Node.js (v18+ recommended)",
    "Create new Next.js app with create-next-app",
    "Choose App Router or Pages Router (App Router recommended)",
    "Set up project structure (app/ or pages/ directory)",
    "Configure TypeScript and ESLint",
    "Set up environment variables (.env.local)",
    "Start development server",
  ],
  proTips: [
    "Use server components by default, client components only when needed",
    "Leverage Next.js Image optimization for better Core Web Vitals",
    "Use generateStaticParams for dynamic routes with known paths",
    "Implement proper metadata API for SEO",
    "Use route groups and parallel routes for complex layouts",
  ],
};

export const vuejsData: TechWithDocs = {
  name: "Vue.js",
  icon: SiVuedotjs,
  color: "#4FC08D",
  proficiency: 80,
  experience: "2+ years with Vue.js applications",
  bestPractices: [
    "Use Composition API with <script setup> for better code organization",
    "Implement proper reactivity with ref, reactive, and computed",
    "Use provide/inject for dependency injection in component trees",
    "Implement proper state management with Pinia (Vuex successor)",
    "Use v-memo directive for expensive list rendering",
    "Leverage Vue's transition system for smooth animations",
    "Implement proper error handling with error boundaries",
    "Use TypeScript with Vue for type safety",
    "Optimize bundle size with lazy loading and code splitting",
    "Follow Vue's style guide for component naming and structure",
  ],
  documentation: [
    { title: "Vue.js Docs", url: "https://vuejs.org", description: "Official Vue.js documentation" },
    { title: "Composition API", url: "https://vuejs.org/guide/extras/composition-api-faq.html", description: "Composition API guide" },
    { title: "Pinia", url: "https://pinia.vuejs.org", description: "State management with Pinia" },
    { title: "Nuxt.js", url: "https://nuxt.com", description: "Vue.js meta-framework" },
  ],
  quickStart: `npm create vue@latest my-app
cd my-app
npm install
npm run dev`,
  initSteps: [
    "Install Node.js (v18+ recommended)",
    "Create new Vue app with create-vue",
    "Choose Composition API and TypeScript options",
    "Set up project structure",
    "Install Pinia for state management",
    "Configure Vue Router for navigation",
    "Start development server",
  ],
  proTips: [
    "Composition API provides better TypeScript support and code reuse",
    "Use <script setup> for cleaner, more concise component code",
    "Pinia is simpler and more intuitive than Vuex",
    "Leverage Vue's reactivity system - it's one of its strongest features",
    "Use Nuxt.js for full-stack Vue applications",
  ],
};

// ============================================
// BACKEND FRAMEWORKS
// ============================================

export const nodeExpressData: TechWithDocs = {
  name: "Node.js + Express",
  icon: SiExpress,
  color: "#000000",
  darkColor: "#ffffff",
  proficiency: 90,
  experience: "5+ years building Node.js/Express applications",
  bestPractices: [
    "Use async/await instead of callbacks or promises chains",
    "Implement proper error handling middleware for centralized error management",
    "Use environment variables for configuration (dotenv)",
    "Implement request validation with libraries like Joi or Zod",
    "Use middleware for cross-cutting concerns (logging, authentication, rate limiting)",
    "Implement proper logging with Winston or Pino",
    "Use connection pooling for database connections",
    "Implement rate limiting to prevent abuse",
    "Use helmet.js for security headers",
    "Structure code with MVC or layered architecture pattern",
  ],
  documentation: [
    { title: "Node.js Docs", url: "https://nodejs.org/docs", description: "Official Node.js documentation" },
    { title: "Express Docs", url: "https://expressjs.com", description: "Official Express.js documentation" },
    { title: "Best Practices", url: "https://github.com/goldbergyoni/nodebestpractices", description: "Node.js best practices" },
    { title: "Express Security", url: "https://expressjs.com/en/advanced/best-practice-security.html", description: "Security best practices" },
  ],
  quickStart: `npm init -y
npm install express
npm install -D nodemon

# Create server.js
const express = require('express');
const app = express();
app.get('/', (req, res) => res.json({ message: 'Hello World' }));
app.listen(3000);`,
  initSteps: [
    "Install Node.js (v18+ LTS recommended)",
    "Initialize npm project with npm init",
    "Install Express and development dependencies",
    "Set up project structure (routes, controllers, middleware)",
    "Configure environment variables",
    "Set up error handling middleware",
    "Configure logging and monitoring",
    "Start development server with nodemon",
  ],
  proTips: [
    "Use TypeScript with Express for better type safety",
    "Implement graceful shutdown for production deployments",
    "Use PM2 or systemd for process management in production",
    "Monitor memory usage - Node.js can have memory leaks with event listeners",
    "Use cluster module or PM2 cluster mode for multi-core utilization",
  ],
};

export const pythonFastapiData: TechWithDocs = {
  name: "Python + FastAPI",
  icon: SiFastapi,
  color: "#009688",
  proficiency: 88,
  experience: "3+ years building FastAPI applications",
  bestPractices: [
    "Use Pydantic models for request/response validation and serialization",
    "Implement proper dependency injection for reusable logic",
    "Use async/await for I/O-bound operations (database, API calls)",
    "Implement proper error handling with HTTPException and custom exception handlers",
    "Use background tasks for long-running operations",
    "Implement proper authentication with OAuth2 and JWT tokens",
    "Use SQLAlchemy or Tortoise ORM for database operations",
    "Implement proper logging with Python's logging module",
    "Use environment variables with pydantic-settings",
    "Structure code with routers for better organization",
  ],
  documentation: [
    { title: "FastAPI Docs", url: "https://fastapi.tiangolo.com", description: "Official FastAPI documentation" },
    { title: "Pydantic", url: "https://docs.pydantic.dev", description: "Data validation library" },
    { title: "SQLAlchemy", url: "https://docs.sqlalchemy.org", description: "Python SQL toolkit" },
    { title: "Best Practices", url: "https://fastapi.tiangolo.com/tutorial/", description: "FastAPI tutorial and best practices" },
  ],
  quickStart: `pip install fastapi uvicorn
# Create main.py
from fastapi import FastAPI
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}

# Run with: uvicorn main:app --reload`,
  initSteps: [
    "Install Python (3.8+ recommended)",
    "Create virtual environment (python -m venv venv)",
    "Install FastAPI and Uvicorn",
    "Set up project structure (routers, models, schemas)",
    "Configure environment variables",
    "Set up database connection (SQLAlchemy, etc.)",
    "Implement authentication and authorization",
    "Start development server with uvicorn",
  ],
  proTips: [
    "FastAPI automatically generates OpenAPI/Swagger documentation",
    "Use dependency injection for database sessions and authentication",
    "Leverage FastAPI's async support for better performance",
    "Use Pydantic models for automatic validation and serialization",
    "Implement proper CORS configuration for frontend integration",
  ],
};

export const elixirPhoenixData: TechWithDocs = {
  name: "Elixir + Phoenix",
  icon: SiElixir,
  color: "#4B275F",
  proficiency: 75,
  experience: "1+ year with Elixir/Phoenix applications",
  bestPractices: [
    "Leverage Elixir's actor model (processes) for concurrency",
    "Use GenServer for stateful processes and OTP patterns",
    "Implement proper supervision trees for fault tolerance",
    "Use Phoenix LiveView for real-time, interactive applications",
    "Implement proper Ecto schemas and changesets for data validation",
    "Use Phoenix Channels for WebSocket connections",
    "Leverage pattern matching and pipe operator for clean code",
    "Implement proper error handling with {:ok, result} and {:error, reason} tuples",
    "Use Mix tasks for project management and code generation",
    "Structure code with contexts for domain-driven design",
  ],
  documentation: [
    { title: "Elixir Docs", url: "https://elixir-lang.org/docs.html", description: "Official Elixir documentation" },
    { title: "Phoenix Docs", url: "https://hexdocs.pm/phoenix", description: "Official Phoenix documentation" },
    { title: "Ecto", url: "https://hexdocs.pm/ecto", description: "Database wrapper and query generator" },
    { title: "OTP", url: "https://elixir-lang.org/getting-started/mix-otp/introduction-to-mix.html", description: "OTP and Mix guide" },
  ],
  quickStart: `# Install Elixir
# macOS: brew install elixir
# Linux: apt-get install elixir

mix phx.new my_app
cd my_app
mix deps.get
mix phx.server`,
  initSteps: [
    "Install Erlang/OTP and Elixir",
    "Create new Phoenix project with mix phx.new",
    "Set up database (PostgreSQL recommended)",
    "Configure database connection in config/dev.exs",
    "Run migrations with mix ecto.migrate",
    "Set up project structure (contexts, schemas, controllers)",
    "Start development server with mix phx.server",
  ],
  proTips: [
    "Elixir's 'let it crash' philosophy - use supervision trees",
    "Processes are lightweight - spawn thousands without issues",
    "Pattern matching is powerful - use it extensively",
    "Phoenix LiveView eliminates need for JavaScript for many use cases",
    "Hot code reloading in development is excellent",
  ],
};

// ============================================
// DATABASES
// ============================================

export const postgresqlData: TechWithDocs = {
  name: "PostgreSQL",
  icon: SiPostgresql,
  color: "#336791",
  proficiency: 92,
  experience: "5+ years with PostgreSQL",
  bestPractices: [
    "Use appropriate data types (avoid TEXT when VARCHAR is sufficient)",
    "Create indexes on foreign keys and frequently queried columns",
    "Use EXPLAIN ANALYZE to understand query execution plans",
    "Implement proper connection pooling (PgBouncer)",
    "Use transactions for data consistency",
    "Implement proper backup and point-in-time recovery strategies",
    "Use JSONB for flexible schema with proper indexing",
    "Monitor and optimize VACUUM operations",
    "Use partial indexes for filtered queries",
    "Implement proper security with role-based access control",
  ],
  documentation: [
    { title: "PostgreSQL Docs", url: "https://www.postgresql.org/docs/", description: "Official PostgreSQL documentation" },
    { title: "Index Types", url: "https://www.postgresql.org/docs/current/indexes-types.html", description: "PostgreSQL index types" },
    { title: "Performance Tuning", url: "https://www.postgresql.org/docs/current/performance-tips.html", description: "Performance optimization" },
    { title: "JSONB Guide", url: "https://www.postgresql.org/docs/current/datatype-json.html", description: "JSONB data type guide" },
  ],
  quickStart: `# Install PostgreSQL
# macOS: brew install postgresql
# Linux: apt-get install postgresql
# Windows: Download from postgresql.org

# Create database
createdb mydb

# Connect
psql mydb

# Create table
CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100));`,
  initSteps: [
    "Install PostgreSQL (latest stable version)",
    "Initialize database cluster",
    "Start PostgreSQL service",
    "Create database and user",
    "Set up connection string in application",
    "Run migrations to create schema",
    "Configure connection pooling",
    "Set up monitoring and backups",
  ],
  proTips: [
    "PostgreSQL's MVCC enables excellent concurrency",
    "Use EXPLAIN ANALYZE before optimizing queries",
    "GIN indexes are perfect for JSONB and full-text search",
    "Connection pooling is essential for web applications",
    "Regular VACUUM prevents bloat and maintains performance",
  ],
};

export const mongodbData: TechWithDocs = {
  name: "MongoDB",
  icon: SiMongodb,
  color: "#47A248",
  proficiency: 85,
  experience: "3+ years with MongoDB",
  bestPractices: [
    "Design schema based on access patterns (embed vs reference)",
    "Create indexes on frequently queried fields",
    "Use compound indexes for multi-field queries",
    "Implement proper sharding strategy for horizontal scaling",
    "Use transactions for multi-document operations when needed",
    "Implement proper connection pooling",
    "Use aggregation pipeline for complex queries",
    "Monitor query performance with explain()",
    "Implement proper backup and replication strategies",
    "Use change streams for real-time data synchronization",
  ],
  documentation: [
    { title: "MongoDB Docs", url: "https://www.mongodb.com/docs/", description: "Official MongoDB documentation" },
    { title: "Indexes", url: "https://www.mongodb.com/docs/manual/indexes/", description: "MongoDB indexing guide" },
    { title: "Aggregation", url: "https://www.mongodb.com/docs/manual/aggregation/", description: "Aggregation pipeline guide" },
    { title: "Sharding", url: "https://www.mongodb.com/docs/manual/sharding/", description: "Sharding guide" },
  ],
  quickStart: `# Install MongoDB
# macOS: brew install mongodb-community
# Linux: apt-get install mongodb
# Or use Docker: docker run -d -p 27017:27017 mongo

# Connect with MongoDB Shell
mongosh

# Create database and collection
use mydb
db.users.insertOne({name: "John", email: "john@example.com"})`,
  initSteps: [
    "Install MongoDB (or use MongoDB Atlas cloud)",
    "Start MongoDB service",
    "Connect to MongoDB instance",
    "Create database and collections",
    "Set up indexes on key fields",
    "Configure connection string in application",
    "Implement proper error handling",
    "Set up monitoring and backups",
  ],
  proTips: [
    "MongoDB excels at flexible schemas and rapid development",
    "Embed documents for one-to-few relationships",
    "Reference documents for many-to-many relationships",
    "Use aggregation pipeline for complex analytics",
    "MongoDB Atlas provides excellent managed MongoDB service",
  ],
};

// ============================================
// DEVOPS & INFRASTRUCTURE
// ============================================

export const dockerData: TechWithDocs = {
  name: "Docker",
  icon: SiDocker,
  color: "#2496ED",
  proficiency: 90,
  experience: "4+ years with Docker",
  bestPractices: [
    "Use multi-stage builds to reduce image size",
    "Leverage layer caching by ordering Dockerfile commands from least to most frequently changing",
    "Use .dockerignore to exclude unnecessary files",
    "Run containers as non-root user for security",
    "Use specific image tags instead of 'latest' in production",
    "Implement proper health checks with HEALTHCHECK instruction",
    "Use Docker Compose for multi-container applications",
    "Optimize image layers to minimize build time",
    "Use secrets management for sensitive data",
    "Implement proper logging and monitoring",
  ],
  documentation: [
    { title: "Docker Docs", url: "https://docs.docker.com", description: "Official Docker documentation" },
    { title: "Dockerfile Best Practices", url: "https://docs.docker.com/develop/dev-best-practices/", description: "Dockerfile optimization guide" },
    { title: "Docker Compose", url: "https://docs.docker.com/compose/", description: "Docker Compose documentation" },
    { title: "Multi-stage Builds", url: "https://docs.docker.com/build/building/multi-stage/", description: "Multi-stage build guide" },
  ],
  quickStart: `# Install Docker
# Visit: https://docs.docker.com/get-docker/

# Create Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# Build and run
docker build -t my-app .
docker run -p 3000:3000 my-app`,
  initSteps: [
    "Install Docker Desktop or Docker Engine",
    "Create Dockerfile in project root",
    "Write Dockerfile with appropriate base image",
    "Build Docker image with docker build",
    "Test image locally with docker run",
    "Create docker-compose.yml for multi-container setup",
    "Push image to container registry (Docker Hub, ECR, etc.)",
    "Deploy to production environment",
  ],
  proTips: [
    "Use alpine images for smaller size, but be aware of compatibility",
    "Multi-stage builds separate build and runtime environments",
    "Docker Compose is perfect for local development",
    "Use docker system prune to clean up unused resources",
    "Leverage Docker volumes for persistent data",
  ],
};

export const kubernetesData: TechWithDocs = {
  name: "Kubernetes",
  icon: SiKubernetes,
  color: "#326CE5",
  proficiency: 85,
  experience: "3+ years with Kubernetes",
  bestPractices: [
    "Use Deployments instead of Pods directly for better management",
    "Implement proper resource requests and limits for containers",
    "Use ConfigMaps and Secrets for configuration management",
    "Implement proper health checks (liveness and readiness probes)",
    "Use Services for service discovery and load balancing",
    "Implement HorizontalPodAutoscaler for automatic scaling",
    "Use Namespaces to organize and isolate resources",
    "Implement proper RBAC (Role-Based Access Control)",
    "Use PersistentVolumes for stateful applications",
    "Monitor cluster health and resource usage",
  ],
  documentation: [
    { title: "Kubernetes Docs", url: "https://kubernetes.io/docs/", description: "Official Kubernetes documentation" },
    { title: "Getting Started", url: "https://kubernetes.io/docs/setup/", description: "Kubernetes setup guide" },
    { title: "Best Practices", url: "https://kubernetes.io/docs/concepts/configuration/overview/", description: "Configuration best practices" },
    { title: "kubectl", url: "https://kubernetes.io/docs/reference/kubectl/", description: "kubectl command reference" },
  ],
  quickStart: `# Install kubectl
# macOS: brew install kubectl
# Or use: https://kubernetes.io/docs/tasks/tools/

# Install minikube for local cluster
minikube start

# Create deployment
kubectl create deployment my-app --image=my-app:latest

# Expose service
kubectl expose deployment my-app --type=LoadBalancer --port=80`,
  initSteps: [
    "Install kubectl CLI tool",
    "Set up Kubernetes cluster (local with minikube/kind or cloud)",
    "Configure kubectl to connect to cluster",
    "Create deployment YAML files",
    "Apply deployments with kubectl apply",
    "Set up Services for networking",
    "Configure ConfigMaps and Secrets",
    "Set up monitoring and logging",
  ],
  proTips: [
    "Use kubectl get, describe, and logs for debugging",
    "Helm charts simplify complex application deployments",
    "Resource requests/limits prevent resource starvation",
    "Readiness probes prevent traffic to unhealthy pods",
    "Use kubectl port-forward for local development access",
  ],
};

export const gitData: TechWithDocs = {
  name: "Git",
  icon: SiGit,
  color: "#F05032",
  proficiency: 95,
  experience: "8+ years with Git",
  bestPractices: [
    "Write clear, descriptive commit messages following conventional commits",
    "Use feature branches for new work, never commit directly to main",
    "Keep commits atomic - one logical change per commit",
    "Use interactive rebase to clean up commit history before merging",
    "Implement proper .gitignore to exclude build artifacts and secrets",
    "Use git hooks for pre-commit checks and automated testing",
    "Regularly pull and rebase to keep branches up to date",
    "Use meaningful branch names (feature/, fix/, hotfix/)",
    "Review changes with git diff before committing",
    "Use git stash for temporary work in progress",
  ],
  documentation: [
    { title: "Git Docs", url: "https://git-scm.com/doc", description: "Official Git documentation" },
    { title: "Pro Git Book", url: "https://git-scm.com/book", description: "Comprehensive Git guide" },
    { title: "GitHub Guides", url: "https://guides.github.com", description: "GitHub workflow guides" },
    { title: "Conventional Commits", url: "https://www.conventionalcommits.org", description: "Commit message convention" },
  ],
  quickStart: `# Install Git
# macOS: brew install git
# Linux: apt-get install git
# Windows: Download from git-scm.com

# Initialize repository
git init

# Configure user
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Basic workflow
git add .
git commit -m "Initial commit"
git push origin main`,
  initSteps: [
    "Install Git on your system",
    "Configure user name and email",
    "Initialize repository with git init",
    "Create .gitignore file",
    "Make initial commit",
    "Set up remote repository (GitHub, GitLab, etc.)",
    "Push to remote with git push",
    "Set up branch protection rules",
  ],
  proTips: [
    "Use git reflog to recover lost commits",
    "git bisect helps find when bugs were introduced",
    "Use git worktree for multiple working directories",
    "Leverage git aliases for frequently used commands",
    "Understand the three states: working directory, staging area, repository",
  ],
};

// ============================================
// MONITORING & OBSERVABILITY
// ============================================

export const prometheusData: TechWithDocs = {
  name: "Prometheus",
  icon: SiPrometheus,
  color: "#E6522C",
  proficiency: 85,
  experience: "3+ years with Prometheus",
  bestPractices: [
    "Use appropriate metric types (Counter, Gauge, Histogram, Summary)",
    "Follow naming conventions for metrics (snake_case, descriptive names)",
    "Add labels to metrics for dimensionality, but avoid high cardinality",
    "Use recording rules to pre-compute expensive queries",
    "Implement proper alerting rules with meaningful thresholds",
    "Use service discovery for dynamic target configuration",
    "Configure proper retention policies for time series data",
    "Use PromQL effectively for querying and alerting",
    "Implement proper scrape intervals based on metric update frequency",
    "Monitor Prometheus itself for resource usage",
  ],
  documentation: [
    { title: "Prometheus Docs", url: "https://prometheus.io/docs/", description: "Official Prometheus documentation" },
    { title: "PromQL", url: "https://prometheus.io/docs/prometheus/latest/querying/basics/", description: "PromQL query language guide" },
    { title: "Best Practices", url: "https://prometheus.io/docs/practices/", description: "Prometheus best practices" },
    { title: "Exporters", url: "https://prometheus.io/docs/instrumenting/exporters/", description: "Prometheus exporters" },
  ],
  quickStart: `# Install Prometheus
# Download from: https://prometheus.io/download/

# Create prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

# Run
./prometheus --config.file=prometheus.yml`,
  initSteps: [
    "Download and install Prometheus",
    "Create prometheus.yml configuration file",
    "Configure scrape targets (applications, exporters)",
    "Set up service discovery if needed",
    "Start Prometheus server",
    "Configure alerting rules",
    "Set up Alertmanager for alert routing",
    "Integrate with Grafana for visualization",
  ],
  proTips: [
    "Prometheus is pull-based - applications expose metrics endpoints",
    "Use exporters for systems that don't natively support Prometheus",
    "Recording rules improve query performance",
    "Alertmanager handles alert deduplication and routing",
    "PromQL is powerful - learn aggregation functions and operators",
  ],
};

export const grafanaData: TechWithDocs = {
  name: "Grafana",
  icon: SiGrafana,
  color: "#F46800",
  proficiency: 85,
  experience: "3+ years with Grafana",
  bestPractices: [
    "Organize dashboards with folders and tags",
    "Use variables for dynamic dashboard configuration",
    "Implement proper panel organization and layout",
    "Use appropriate visualization types for different metrics",
    "Set up alerting rules with meaningful thresholds",
    "Use annotations to mark important events",
    "Implement proper data source configuration",
    "Use dashboard templates and JSON export for version control",
    "Configure proper time ranges and refresh intervals",
    "Use Grafana's explore feature for ad-hoc queries",
  ],
  documentation: [
    { title: "Grafana Docs", url: "https://grafana.com/docs/", description: "Official Grafana documentation" },
    { title: "Dashboard Guide", url: "https://grafana.com/docs/grafana/latest/dashboards/", description: "Dashboard creation guide" },
    { title: "Alerting", url: "https://grafana.com/docs/grafana/latest/alerting/", description: "Alerting configuration" },
    { title: "Data Sources", url: "https://grafana.com/docs/grafana/latest/datasources/", description: "Data source configuration" },
  ],
  quickStart: `# Install Grafana
# macOS: brew install grafana
# Linux: apt-get install grafana
# Or use Docker: docker run -d -p 3000:3000 grafana/grafana

# Access at http://localhost:3000
# Default login: admin/admin`,
  initSteps: [
    "Install Grafana (or use Docker)",
    "Start Grafana service",
    "Access Grafana web UI (default port 3000)",
    "Configure data sources (Prometheus, InfluxDB, etc.)",
    "Create dashboards with panels",
    "Set up alerting rules",
    "Configure notification channels",
    "Export dashboards as JSON for version control",
  ],
  proTips: [
    "Grafana dashboards are JSON - store them in version control",
    "Use dashboard variables for reusable dashboards",
    "Grafana Cloud provides managed Grafana service",
    "Use explore mode for quick metric investigation",
    "Alerting in Grafana is powerful - use it for proactive monitoring",
  ],
};

// ============================================
// AWS SERVICES
// ============================================

export const awsS3Data: TechWithDocs = {
  name: "AWS S3",
  icon: SiAmazonwebservices,
  color: "#569A31",
  proficiency: 88,
  experience: "4+ years with AWS S3",
  bestPractices: [
    "Use appropriate storage classes (Standard, IA, Glacier) based on access patterns",
    "Implement proper bucket policies and IAM roles for security",
    "Enable versioning for critical data",
    "Use lifecycle policies to automatically transition objects",
    "Enable server-side encryption (SSE) for data at rest",
    "Configure proper CORS policies for web applications",
    "Use presigned URLs for temporary access",
    "Implement proper error handling and retry logic",
    "Use multipart upload for large files (>5GB)",
    "Monitor costs and optimize storage usage",
  ],
  documentation: [
    { title: "S3 Docs", url: "https://docs.aws.amazon.com/s3/", description: "Official S3 documentation" },
    { title: "Best Practices", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html", description: "S3 security best practices" },
    { title: "Storage Classes", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html", description: "S3 storage classes" },
    { title: "Lifecycle Policies", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html", description: "Lifecycle management" },
  ],
  quickStart: `# Install AWS CLI
pip install awscli

# Configure credentials
aws configure

# Create bucket
aws s3 mb s3://my-bucket

# Upload file
aws s3 cp file.txt s3://my-bucket/

# List objects
aws s3 ls s3://my-bucket/`,
  initSteps: [
    "Set up AWS account and IAM user",
    "Install and configure AWS CLI",
    "Create S3 bucket with appropriate region",
    "Configure bucket policies and permissions",
    "Set up lifecycle policies if needed",
    "Enable versioning and encryption",
    "Integrate S3 SDK in application",
    "Implement proper error handling",
  ],
  proTips: [
    "S3 is eventually consistent - design for this",
    "Use CloudFront with S3 for global content delivery",
    "S3 Transfer Acceleration speeds up uploads",
    "Lifecycle policies automatically optimize costs",
    "Use S3 event notifications for event-driven architectures",
  ],
};

export const awsEc2AsgData: TechWithDocs = {
  name: "AWS EC2 + ASG",
  icon: SiAmazonwebservices,
  color: "#FF9900",
  proficiency: 85,
  experience: "3+ years with EC2 and Auto Scaling",
  bestPractices: [
    "Use Auto Scaling Groups (ASG) for automatic scaling",
    "Configure launch templates for consistent instance configuration",
    "Use multiple Availability Zones for high availability",
    "Implement proper security groups with least privilege",
    "Use Elastic IPs sparingly - prefer Elastic Load Balancer",
    "Configure CloudWatch alarms for scaling triggers",
    "Use spot instances for cost optimization where appropriate",
    "Implement proper instance monitoring with CloudWatch",
    "Use Systems Manager for instance management",
    "Tag instances properly for cost tracking and organization",
  ],
  documentation: [
    { title: "EC2 Docs", url: "https://docs.aws.amazon.com/ec2/", description: "Official EC2 documentation" },
    { title: "Auto Scaling", url: "https://docs.aws.amazon.com/autoscaling/ec2/userguide/", description: "Auto Scaling Groups guide" },
    { title: "Launch Templates", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-launch-templates.html", description: "Launch template guide" },
    { title: "Best Practices", url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-best-practices.html", description: "EC2 best practices" },
  ],
  quickStart: `# Create launch template
aws ec2 create-launch-template \\
  --launch-template-name my-template \\
  --launch-template-data file://template.json

# Create Auto Scaling Group
aws autoscaling create-auto-scaling-group \\
  --auto-scaling-group-name my-asg \\
  --launch-template LaunchTemplateName=my-template \\
  --min-size 1 --max-size 10 --desired-capacity 2 \\
  --vpc-zone-identifier subnet-xxx`,
  initSteps: [
    "Create VPC and subnets in multiple AZs",
    "Create security groups with appropriate rules",
    "Create launch template with AMI and instance type",
    "Create Auto Scaling Group with launch template",
    "Configure scaling policies (target tracking, step scaling)",
    "Set up CloudWatch alarms for scaling triggers",
    "Configure health checks",
    "Test scaling behavior",
  ],
  proTips: [
    "ASG automatically replaces unhealthy instances",
    "Use target tracking for simple scaling based on metrics",
    "Launch templates enable versioning and rollback",
    "Multiple AZs provide high availability",
    "Use ASG with ELB for load-balanced applications",
  ],
};

export const awsEcsData: TechWithDocs = {
  name: "AWS ECS",
  icon: SiAmazonwebservices,
  color: "#FF9900",
  proficiency: 80,
  experience: "2+ years with ECS",
  bestPractices: [
    "Use Fargate for serverless container orchestration",
    "Use ECS Task Definitions for container configuration",
    "Implement proper IAM roles for tasks",
    "Use ECS Service for long-running tasks with auto-scaling",
    "Configure proper health checks",
    "Use ECS Exec for debugging running containers",
    "Implement proper logging with CloudWatch Logs",
    "Use ECS Capacity Providers for better cost optimization",
    "Configure service discovery for inter-service communication",
    "Use ECS Task Placement strategies for optimal distribution",
  ],
  documentation: [
    { title: "ECS Docs", url: "https://docs.aws.amazon.com/ecs/", description: "Official ECS documentation" },
    { title: "Fargate", url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html", description: "Fargate guide" },
    { title: "Task Definitions", url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html", description: "Task definition guide" },
    { title: "Service Discovery", url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-discovery.html", description: "Service discovery guide" },
  ],
  quickStart: `# Create cluster
aws ecs create-cluster --cluster-name my-cluster

# Register task definition
aws ecs register-task-definition --cli-input-json file://task-def.json

# Create service
aws ecs create-service \\
  --cluster my-cluster \\
  --service-name my-service \\
  --task-definition my-task \\
  --desired-count 2`,
  initSteps: [
    "Create ECS cluster (EC2 or Fargate)",
    "Create task definition with container images",
    "Configure IAM roles for tasks",
    "Create ECS service for long-running tasks",
    "Set up Application Load Balancer if needed",
    "Configure auto-scaling policies",
    "Set up CloudWatch logging",
    "Deploy and monitor",
  ],
  proTips: [
    "Fargate eliminates need to manage EC2 instances",
    "ECS integrates well with other AWS services",
    "Use ECS Exec for debugging without SSH",
    "Task definitions enable versioning and rollback",
    "ECS Service handles rolling deployments automatically",
  ],
};

export const awsEksData: TechWithDocs = {
  name: "AWS EKS",
  icon: SiAmazonwebservices,
  color: "#FF9900",
  proficiency: 80,
  experience: "2+ years with EKS",
  bestPractices: [
    "Use managed node groups for easier management",
    "Implement proper IAM roles for service accounts (IRSA)",
    "Use AWS Load Balancer Controller for ingress",
    "Configure cluster autoscaler for node scaling",
    "Implement proper network policies for security",
    "Use EKS Add-ons for common functionality",
    "Configure proper logging with CloudWatch Container Insights",
    "Use Fargate profiles for serverless pods",
    "Implement proper backup and disaster recovery",
    "Monitor cluster health and resource usage",
  ],
  documentation: [
    { title: "EKS Docs", url: "https://docs.aws.amazon.com/eks/", description: "Official EKS documentation" },
    { title: "Getting Started", url: "https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html", description: "EKS getting started guide" },
    { title: "IRSA", url: "https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html", description: "IAM roles for service accounts" },
    { title: "Best Practices", url: "https://aws.github.io/aws-eks-best-practices/", description: "EKS best practices" },
  ],
  quickStart: `# Install eksctl
# macOS: brew install eksctl
# Or: https://eksctl.io/installation/

# Create cluster
eksctl create cluster \\
  --name my-cluster \\
  --region us-east-1 \\
  --nodegroup-name standard-workers \\
  --node-type t3.medium \\
  --nodes 2`,
  initSteps: [
    "Install eksctl CLI tool",
    "Create EKS cluster with eksctl or AWS Console",
    "Configure kubectl to connect to cluster",
    "Set up node groups (managed or self-managed)",
    "Configure IAM roles for service accounts",
    "Install AWS Load Balancer Controller",
    "Set up cluster autoscaler",
    "Deploy applications and monitor",
  ],
  proTips: [
    "eksctl simplifies EKS cluster creation and management",
    "IRSA enables fine-grained IAM permissions for pods",
    "Fargate profiles provide serverless Kubernetes",
    "Use AWS Load Balancer Controller for ALB/NLB integration",
    "Cluster autoscaler automatically adjusts node count",
  ],
};

export const awsCloudfrontData: TechWithDocs = {
  name: "AWS CloudFront",
  icon: SiAmazonwebservices,
  color: "#FF9900",
  proficiency: 85,
  experience: "3+ years with CloudFront",
  bestPractices: [
    "Use CloudFront for global content delivery and caching",
    "Configure proper cache behaviors and TTLs",
    "Use origin request policies for header forwarding",
    "Implement proper security with signed URLs and signed cookies",
    "Use CloudFront Functions for edge computing",
    "Configure proper error pages and custom error responses",
    "Use AWS WAF with CloudFront for security",
    "Monitor cache hit ratios and optimize",
    "Configure proper CORS headers",
    "Use CloudFront with S3 for static website hosting",
  ],
  documentation: [
    { title: "CloudFront Docs", url: "https://docs.aws.amazon.com/cloudfront/", description: "Official CloudFront documentation" },
    { title: "Cache Behaviors", url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/UnderstandingCacheBehavior.html", description: "Cache behavior guide" },
    { title: "CloudFront Functions", url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html", description: "Edge computing with functions" },
    { title: "Best Practices", url: "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/best-practices.html", description: "CloudFront best practices" },
  ],
  quickStart: `# Create distribution
aws cloudfront create-distribution \\
  --distribution-config file://dist-config.json

# Invalidate cache
aws cloudfront create-invalidation \\
  --distribution-id E1234567890 \\
  --paths "/*"`,
  initSteps: [
    "Create CloudFront distribution",
    "Configure origin (S3, ALB, custom origin)",
    "Set up cache behaviors and policies",
    "Configure SSL/TLS certificate",
    "Set up custom domain (optional)",
    "Configure error pages",
    "Test distribution",
    "Monitor performance and cache hit ratios",
  ],
  proTips: [
    "CloudFront reduces latency and bandwidth costs",
    "Cache invalidation can be expensive - use versioned URLs instead",
    "CloudFront Functions run at edge for low latency",
    "Use signed URLs for private content",
    "CloudFront integrates seamlessly with S3 and ALB",
  ],
};

export const awsRoute53Data: TechWithDocs = {
  name: "AWS Route 53",
  icon: SiAmazonwebservices,
  color: "#FF9900",
  proficiency: 85,
  experience: "3+ years with Route 53",
  bestPractices: [
    "Use Route 53 for DNS management and health checks",
    "Implement proper health checks for high availability",
    "Use weighted routing for A/B testing and gradual rollouts",
    "Configure failover routing for disaster recovery",
    "Use latency-based routing for optimal performance",
    "Implement proper TTL values based on change frequency",
    "Use Route 53 Resolver for hybrid cloud DNS",
    "Configure proper security with DNSSEC",
    "Use Route 53 for domain registration and management",
    "Monitor DNS query metrics and costs",
  ],
  documentation: [
    { title: "Route 53 Docs", url: "https://docs.aws.amazon.com/route53/", description: "Official Route 53 documentation" },
    { title: "Routing Policies", url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html", description: "Routing policy guide" },
    { title: "Health Checks", url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks.html", description: "Health check guide" },
    { title: "Best Practices", url: "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-best-practices.html", description: "DNS best practices" },
  ],
  quickStart: `# Create hosted zone
aws route53 create-hosted-zone \\
  --name example.com \\
  --caller-reference $(date +%s)

# Create record
aws route53 change-resource-record-sets \\
  --hosted-zone-id Z123456789 \\
  --change-batch file://changes.json`,
  initSteps: [
    "Create hosted zone for domain",
    "Update nameservers at domain registrar",
    "Create DNS records (A, AAAA, CNAME, etc.)",
    "Configure routing policies if needed",
    "Set up health checks",
    "Configure failover or weighted routing",
    "Monitor DNS query metrics",
    "Set up DNSSEC if required",
  ],
  proTips: [
    "Route 53 health checks enable automatic failover",
    "Weighted routing is great for gradual deployments",
    "Latency-based routing improves user experience",
    "Route 53 Resolver enables hybrid cloud DNS",
    "Use alias records for AWS resources (no cost)",
  ],
};

// ============================================
// FIREBASE & MOBILE
// ============================================

export const firebaseFcmData: TechWithDocs = {
  name: "Firebase FCM",
  icon: SiFirebase,
  color: "#FFCA28",
  proficiency: 80,
  experience: "2+ years with Firebase FCM",
  bestPractices: [
    "Use FCM (Firebase Cloud Messaging) for push notifications",
    "Implement proper token management and refresh",
    "Use topic-based messaging for broadcast notifications",
    "Implement proper error handling for failed deliveries",
    "Use data messages for app-controlled notifications",
    "Configure proper notification payloads for different platforms",
    "Implement proper user segmentation for targeted messaging",
    "Use FCM Admin SDK for server-side sending",
    "Monitor delivery rates and engagement metrics",
    "Implement proper notification scheduling and batching",
  ],
  documentation: [
    { title: "FCM Docs", url: "https://firebase.google.com/docs/cloud-messaging", description: "Official FCM documentation" },
    { title: "Setup Guide", url: "https://firebase.google.com/docs/cloud-messaging/js/client", description: "FCM setup guide" },
    { title: "Admin SDK", url: "https://firebase.google.com/docs/cloud-messaging/admin", description: "FCM Admin SDK guide" },
    { title: "Best Practices", url: "https://firebase.google.com/docs/cloud-messaging/concept-options", description: "FCM best practices" },
  ],
  quickStart: `# Install Firebase Admin SDK
npm install firebase-admin

# Initialize
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

# Send notification
admin.messaging().send({
  token: deviceToken,
  notification: {
    title: 'Hello',
    body: 'World'
  }
})`,
  initSteps: [
    "Create Firebase project in Firebase Console",
    "Generate service account key",
    "Install Firebase Admin SDK",
    "Initialize Firebase Admin in backend",
    "Set up FCM client SDK in mobile/web app",
    "Request notification permissions",
    "Get and store FCM tokens",
    "Implement notification sending logic",
  ],
  proTips: [
    "FCM tokens can change - implement refresh logic",
    "Topic-based messaging is great for broadcast",
    "Use data messages for app-controlled behavior",
    "FCM supports both notification and data payloads",
    "Monitor delivery rates in Firebase Console",
  ],
};

// ============================================
// DEVELOPMENT TOOLS
// ============================================

export const cursorData: TechWithDocs = {
  name: "Cursor",
  icon: FaCode,
  color: "#000000",
  darkColor: "#ffffff",
  proficiency: 90,
  experience: "2+ years with Cursor IDE",
  bestPractices: [
    "Use Cursor's AI features for code generation and refactoring",
    "Leverage inline AI chat for quick questions and explanations",
    "Use Composer for multi-file edits and complex refactoring",
    "Configure proper .cursorrules for project-specific AI behavior",
    "Use keyboard shortcuts for efficient AI interactions",
    "Implement proper code review even with AI assistance",
    "Use Cursor's codebase indexing for better context",
    "Leverage AI for test generation and documentation",
    "Use chat for debugging and understanding complex code",
    "Configure proper file exclusions for privacy and performance",
  ],
  documentation: [
    { title: "Cursor Docs", url: "https://docs.cursor.com", description: "Official Cursor documentation" },
    { title: "AI Features", url: "https://docs.cursor.com/features", description: "Cursor AI features guide" },
    { title: "Composer", url: "https://docs.cursor.com/composer", description: "Multi-file editing with Composer" },
    { title: "Best Practices", url: "https://docs.cursor.com/best-practices", description: "Cursor best practices" },
  ],
  quickStart: `# Install Cursor
# Download from: https://cursor.sh

# Configure .cursorrules
# Add project-specific rules for AI behavior

# Use AI Chat
# Cmd/Ctrl + L for inline chat
# Cmd/Ctrl + K for inline edit

# Use Composer
# Cmd/Ctrl + I for multi-file editing`,
  initSteps: [
    "Download and install Cursor IDE",
    "Sign in with account",
    "Open project in Cursor",
    "Configure .cursorrules file",
    "Set up keyboard shortcuts",
    "Enable codebase indexing",
    "Configure file exclusions",
    "Start using AI features",
  ],
  proTips: [
    "Cursor is built on VS Code - familiar interface",
    "AI chat provides excellent code explanations",
    "Composer is powerful for refactoring across files",
    ".cursorrules customize AI behavior per project",
    "Use AI for generating tests and documentation",
  ],
};

// ============================================
// EXPORTS
// ============================================

export const allTechs: TechWithDocs[] = [
  // Vector Databases
  pineconeData,
  weaviateData,
  qdrantData,
  pgvectorData,
  chromaData,
  // RAG Frameworks
  langchainData,
  llamaindexData,
  // Frontend Frameworks
  reactData,
  nextjsData,
  vuejsData,
  // Backend Frameworks
  nodeExpressData,
  pythonFastapiData,
  elixirPhoenixData,
  // Databases
  postgresqlData,
  mongodbData,
  // DevOps & Infrastructure
  dockerData,
  kubernetesData,
  gitData,
  // Monitoring & Observability
  prometheusData,
  grafanaData,
  // Serverless & Scaling
  vercelEdgeData,
  awsLambdaData,
  cloudflareWorkersData,
  supabaseEdgeData,
  // Database Pooling
  pgbouncerData,
  neonData,
  planetscaleData,
  // Database Optimizations
  postgresOptimizationData,
  mvccData,
  jsonbOptimizationData,
  // AI APIs
  openaiData,
  anthropicData,
  // AWS Services
  awsS3Data,
  awsEc2AsgData,
  awsEcsData,
  awsEksData,
  awsCloudfrontData,
  awsRoute53Data,
  // Firebase & Mobile
  firebaseFcmData,
  // Development Tools
  cursorData,
];
