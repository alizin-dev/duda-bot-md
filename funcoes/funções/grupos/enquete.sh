yarn pbjs -t static-module -w commonjs -o ./WAProto/enquete.js ./WAProto/WAProto.proto;
yarn pbts -o ./WAProto/index.d.ts ./WAProto/enquete.js;